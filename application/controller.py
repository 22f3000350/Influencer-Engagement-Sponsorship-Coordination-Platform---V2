from flask import render_template
from flask import current_app as app
from .database import db
from flask_security import hash_password

@app.get('/')
def index():
    return render_template("index.html")

