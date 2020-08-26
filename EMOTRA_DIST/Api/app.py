from flask import Flask, request, jsonify
from flask_cors import cross_origin
import datetime
from config import db, ma, app
from models import Emoji, emoji_schema, emojis_schema

@app.route("/")
@cross_origin()
def home():
    now = datetime.datetime.now()
    return "Hey There! :) " + now.strftime("%Y-%m-%d %H:%M:%S")

# endpoint to show all users
@app.route("/emoji", methods=["GET"])
@cross_origin()
def get_all_emojis():
    all_users = Emoji.query.all()
    result = emojis_schema.dump(all_users)
    return emojis_schema.jsonify(result.data)


# endpoint to get user detail by id
@app.route("/emoji/<codepoint>", methods=["GET"])
@cross_origin()
def get_emoji(codepoint):
    emoji = Emoji.query.get(codepoint)
    return emoji_schema.jsonify(emoji)

# endpoint to get emoji by name
@app.route("/emoji/name/<name>", methods=["GET"])
@cross_origin()
def get_emoji_by_name(name):
    emoji = Emoji.query.filter_by(name=name)
    if emoji is None:
        response = {
                 'message': 'user does not exist'
                   }
        return jsonify(response), 404
    result = emojis_schema.dump(emoji)
    return emojis_schema.jsonify(result.data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')