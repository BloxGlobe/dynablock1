import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "auth_users.db")


def get_conn():
    return sqlite3.connect(DB_PATH)


def init_db():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


def add_user(username, email, password_hash):
    conn = get_conn()
    cur = conn.cursor()
    now = datetime.utcnow().isoformat()
    cur.execute("INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)", (username, email, password_hash, now))
    conn.commit()
    user_id = cur.lastrowid
    conn.close()
    return user_id


def get_user_by_username(username):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email, password_hash FROM users WHERE username = ?", (username,))
    row = cur.fetchone()
    conn.close()
    return row


def get_user_by_email(email):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email, password_hash FROM users WHERE email = ?", (email,))
    row = cur.fetchone()
    conn.close()
    return row


def get_user_by_id(user_id):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email FROM users WHERE id = ?", (user_id,))
    row = cur.fetchone()
    conn.close()
    return row
