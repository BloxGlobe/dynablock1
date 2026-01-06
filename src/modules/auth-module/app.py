import os
import sys
from flask import Flask

# Ensure imports resolve when running this file directly
os.chdir(os.path.dirname(__file__))
sys.path.insert(0, "")

from routes.auth_routes import auth_bp


def create_app():
    app = Flask(__name__)
    app.register_blueprint(auth_bp)
    return app


if __name__ == "__main__":
    port = int(os.environ.get("AUTH_PORT", 5001))
    app = create_app()
    app.run(host="0.0.0.0", port=port, debug=True)
