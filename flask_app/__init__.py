import os
from flask import Flask
from pathlib import Path
from dotenv import load_dotenv

dotenv_path = Path('flask_app/.env')
load_dotenv(dotenv_path=dotenv_path)

app = Flask(__name__)
app.secret_key = os.getenv("APP_SECRET_KEY")
