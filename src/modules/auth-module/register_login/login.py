from flask import request, jsonify, make_response
from werkzeug.security import check_password_hash
import jwt
import os
from datetime import datetime, timedelta

from .. import user_db

SECRET = os.environ.get("AUTH_SECRET", "dev-secret")


def login():
    data = request.get_json(force=True)
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return make_response(jsonify({"error": "username and password required"}), 400)

    user_db.init_db()

    user = user_db.get_user_by_username(username)
    if not user:
        return make_response(jsonify({"error": "invalid credentials"}), 401)

    if not check_password_hash(user[3], password):
        return make_response(jsonify({"error": "invalid credentials"}), 401)

    token = jwt.encode({"user_id": user[0], "exp": datetime.utcnow() + timedelta(hours=24)}, SECRET, algorithm="HS256")

    return make_response(jsonify({"token": token, "user": {"id": user[0], "username": user[1], "email": user[2]}}), 200)
