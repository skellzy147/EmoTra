import numpy
import pandas
import sqlite3

def mask(codeUnit):
    return str(hex(codeUnit)).upper()

def utfSencode(codepoint):
    codepoint = int(codepoint, 16)
    TEN_BITS = int('1111111111', 2)
    if (codepoint <= 0xFFFF):
        return mask(codepoint)
    codepoint = codepoint - 0x10000
    #// Shift right to get to most significant 10 bits
    leadSurrogate = 0xD800 + (codepoint >> 10)
    #// Mask to get least significant 10 bits
    tailSurrogate = 0xDC00 + (codepoint & TEN_BITS)
    return mask(leadSurrogate) + mask(tailSurrogate)

def splitCodes(codeUnit): 
    string = ""
    for code in codeUnit.split():
        string = string + utfSencode(code)
    return string 

def createLink(codeUnit, platform):
    linkString = "images/img-" + platform +"-64/"
    imageIdentifier = codeUnit.lower().replace(" ", "-")
    imageTag = ".png"
    return linkString + imageIdentifier + imageTag


conn = sqlite3.connect("emoji.sqlite")
curs = conn.cursor()

CSV_FILEPATH = "../emoji_df.csv"
CSVREAD = pandas.read_csv(CSV_FILEPATH, usecols= lambda x : x.lower() in ['emoji', 'name', 'codepoint'])
CSVREAD['encodedValues'] = CSVREAD.apply(lambda x : splitCodes(x['codepoint']), axis=1)
CSVREAD['facebook'] = CSVREAD.apply(lambda x : createLink(x['codepoint'], "facebook"), axis=1)
CSVREAD['apple'] = CSVREAD.apply(lambda x : createLink(x['codepoint'], "apple"), axis=1)
CSVREAD['twitter'] = CSVREAD.apply(lambda x : createLink(x['codepoint'], "twitter"), axis=1)
CSVREAD['google'] = CSVREAD.apply(lambda x : createLink(x['codepoint'], "google"), axis=1)
print(CSVREAD)
CSVREAD.to_sql('emoji', conn, if_exists='replace')
conn.commit()
conn.execute(
    ''';WITH DUPLICATES AS (
	        SELECT a.*
	        FROM emoji a
	        JOIN (
		        SELECT name, codepoint, COUNT(*)
		        FROM emoji
		        GROUP BY name
		        HAVING COUNT(*) > 1) b
	        On a.name = b.name
	        AND NOT length(a.codepoint) < length(b.codepoint)
	        ORDER by a.name
        )
        UPDATE emoji
        SET
            codepoint = (SELECT DUPLICATES.codepoint
                            FROM DUPLICATES
                            WHERE DUPLICATES.name = emoji.name),
            facebook = (SELECT DUPLICATES.facebook
                            FROM DUPLICATES
                            WHERE DUPLICATES.name = emoji.name),
            twitter = (SELECT DUPLICATES.twitter
                            FROM DUPLICATES
                            WHERE DUPLICATES.name = emoji.name),
            google = (SELECT DUPLICATES.google
                            FROM DUPLICATES
                            WHERE DUPLICATES.name = emoji.name),
            apple = (SELECT DUPLICATES.apple
                            FROM DUPLICATES
                            WHERE DUPLICATES.name = emoji.name)
        WHERE
            EXISTS (
                SELECT *
                FROM DUPLICATES
                WHERE DUPLICATES.name = emoji.name
            )''')

conn.close()
