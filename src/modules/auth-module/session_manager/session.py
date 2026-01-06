from flask import request, jsonify, make_response
import jwt
import os

from .. import user_db

SECRET = os.environ.get("AUTH_SECRET", "dev-secret")


def load_session():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return make_response(jsonify({"user": None}), 200)
    token = auth.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        user_id = payload.get("user_id")
        user_db.init_db()
        user = user_db.get_user_by_id(user_id)
        if not user:
            return make_response(jsonify({"user": None}), 200)
        return make_response(jsonify({"user": {"id": user[0], "username": user[1], "email": user[2]}}), 200)
    except Exception:
        return make_response(jsonify({"user": None}), 200)


def clear_session():
    # For stateless JWT, client should remove token. Server returns success.
    return make_response(jsonify({"ok": True}), 200)
