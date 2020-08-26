from config import db, ma

class Emoji(db.Model):
    __tablename__ = "emoji"
    emoji = db.Column(db.String)
    name = db.Column(db.String(128))
    codepoint = db.Column(db.String(32))
    encodedValues = db.Column(db.String(256), primary_key=True)
    facebook = db.Column(db.String(256))
    apple = db.Column(db.String(256))
    twitter = db.Column(db.String(256))
    google = db.Column(db.String(256))


class EmojiSchema(ma.ModelSchema):
    class Meta:
        model = Emoji
        fields = ("emoji", "codepoint", "name", "encodedValues", "facebook", "apple", "twitter", "google")

emoji_schema = EmojiSchema()
emojis_schema = EmojiSchema(many=True)