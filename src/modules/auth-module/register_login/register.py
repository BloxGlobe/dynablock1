from flask import request, jsonify, make_response
from werkzeug.security import generate_password_hash
import jwt
import os
from datetime import datetime, timedelta

from .. import user_db

SECRET = os.environ.get("AUTH_SECRET", "dev-secret")


def register():
    data = request.get_json(force=True)
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return make_response(jsonify({"error": "username, email and password required"}), 400)

    user_db.init_db()

    if user_db.get_user_by_username(username):
        return make_response(jsonify({"error": "username already exists"}), 409)
    if user_db.get_user_by_email(email):
        return make_response(jsonify({"error": "email already exists"}), 409)

    pw_hash = generate_password_hash(password)
    user_id = user_db.add_user(username, email, pw_hash)

    token = jwt.encode({"user_id": user_id, "exp": datetime.utcnow() + timedelta(hours=24)}, SECRET, algorithm="HS256")

    return make_response(jsonify({"token": token, "user": {"id": user_id, "username": username, "email": email}}), 201)
