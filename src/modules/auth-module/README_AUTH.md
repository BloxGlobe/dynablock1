# Auth module (Python)

Quick instructions to run the small auth server used by the frontend for signup/login.

1. Create a virtualenv and install requirements (from the `src/modules/auth-module` folder):

```bash
python -m venv .venv
source .venv/bin/activate    # on Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

2. Run the server:

```bash
python app.py
```

3. Endpoints:
- `POST /api/auth/register` JSON {"username","email","password"}
- `POST /api/auth/login` JSON {"username","password"}
- `GET /api/auth/session` Header `Authorization: Bearer <token>`
- `POST /api/auth/logout` (stateless, returns ok)

The server stores users in `auth_users.db` next to the module.
