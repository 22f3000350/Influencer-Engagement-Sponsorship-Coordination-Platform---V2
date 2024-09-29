from flask import render_template, request, jsonify
from flask import current_app as app
from .database import *
from flask_security import hash_password

@app.get('/')
def index():
    return render_template("index.html")

@app.post('/sponsor_register')
def sponsor_register():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    company = data.get("company")
    contact_info = data.get("contact_info")
    budget = data.get("budget")

    user=User.query.filter_by(email=email).first()

    if user==None:
        app.security.datastore.create_user(email=email,username=username,password=hash_password(password),roles=['sponsor'])
        sponsor=Sponsor(name=username,company=company,contact_info=contact_info,budget=budget,flag="False")
        db.session.add(sponsor)
        db.session.commit()
        return jsonify({"message":"ok"}),201
    else:
        return jsonify({"message":"User Already Exists"}),201






