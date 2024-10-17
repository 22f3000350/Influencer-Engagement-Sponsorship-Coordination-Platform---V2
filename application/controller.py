from flask import render_template, request
from flask import current_app as app
from .database import *
from flask_security import hash_password, verify_password

@app.get('/')
def index():
    return render_template("index.html")

@app.post('/user-login')
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    user = app.security.datastore.find_user(email=email)
    
    if user:
        if verify_password(password, user.password):
            if user.roles[0].name == role:
                if role=="sponsor":
                    sponsor = Sponsor.query.filter_by(name=user.username).first()
                    return {"message":"ok","token":user.get_auth_token(),"role":role,"id":sponsor.id},201
                elif role=="influencer":
                    influencer = Influencer.query.filter_by(name=user.username).first()
                    return {"message":"ok","token":user.get_auth_token(),"role":role,"id":influencer.id,"name":influencer.name},201
                elif role=="Admin":
                    return {"message":"ok","token":user.get_auth_token(),"role":role},201

            else:
                return {"message":"Incorrect Role"},201
        else:
            return {"message":"Incorrect Username or Password"},201
    else:
        return {"message":"Incorrect Username or Password"},201


@app.post('/sponsor_register')
def sponsor_register():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    company = data.get("company")
    contact_info = data.get("contact_info")
    budget = data.get("budget")

    user_email=User.query.filter_by(email=email).first()

    if user_email==None:

        user_name=User.query.filter_by(username=username).first()

        if user_name==None:
            app.security.datastore.create_user(email=email,username=username,password=hash_password(password),roles=['sponsor'])
            sponsor=Sponsor(name=username,company=company,contact_info=contact_info,budget=budget,flag="False")
            db.session.add(sponsor)
            db.session.commit()
            return {"message":"ok"},201
        else:
            return {"message":"User Already Exists"},201
    else:
        return {"message":"User Already Exists"},201

@app.post('/influencer_register')
def influencer_register():
    data = request.get_json()
    email =  data.get("email")
    username = data.get("username")
    password = data.get("password")
    category = data.get("category")
    niche = data.get("niche")
    followers = data.get("followers")
    platform = data.get("platform")

    user_email=User.query.filter_by(email=email).first()

    if user_email==None:

        user_name=User.query.filter_by(username=username).first()

        if user_name==None:
            app.security.datastore.create_user(email=email,username=username,password=hash_password(password),roles=['influencer'])
            influencer=Influencer(name=username,category=category,niche=niche,platform=platform,followers=followers,flag="False")
            db.session.add(influencer)
            db.session.commit()
            return {"message":"ok"},201
        else:
            return {"message":"User Already Exists"},201
    else:
        return {"message":"User Already Exists"},201





