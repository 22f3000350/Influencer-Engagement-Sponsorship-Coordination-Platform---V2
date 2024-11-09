from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin,RoleMixin

db = SQLAlchemy()

class User(db.Model,UserMixin):
    id=db.Column(db.Integer(),primary_key=True)
    email=db.Column(db.String(),unique=True,nullable=False)
    username=db.Column(db.String(),unique=True,nullable=False)
    password=db.Column(db.String(),nullable=False)
    fs_uniquifier=db.Column(db.String(),unique=True,nullable=False)
    active=db.Column(db.Boolean(),nullable=False)
    roles=db.Relationship('Role',backref='bearers',secondary='user_roles')

class Role(db.Model,RoleMixin):
    id=db.Column(db.Integer(),primary_key=True)
    name=db.Column(db.String(),unique=True,nullable=False)
    description=db.Column(db.String())

class UserRoles(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    role_id=db.Column(db.Integer,db.ForeignKey('role.id'))

class Sponsor(db.Model):
    id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    name=db.Column(db.String(),db.ForeignKey('user.username'),unique=True,nullable=False)
    company=db.Column(db.String(),nullable=False)
    budget=db.Column(db.Integer(),nullable=False)
    contact_info=db.Column(db.String(),nullable=False)
    flag=db.Column(db.String(),nullable=False)
    approval=db.Column(db.String(),nullable=False)
    campaigns=db.relationship('Campaign',backref='sponsor')

class Influencer(db.Model):
    id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    name=db.Column(db.String(),db.ForeignKey('user.username'),unique=True,nullable=False)
    category=db.Column(db.String(),nullable=False)
    niche=db.Column(db.String(),nullable=False)
    platform=db.Column(db.String(),nullable=False)
    followers=db.Column(db.String(),nullable=False)
    flag=db.Column(db.String(),nullable=False)
    ads=db.relationship('Ad',backref='influencer')


class Campaign(db.Model):
    id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    name=db.Column(db.String(),unique=True,nullable=False)
    description=db.Column(db.String(),nullable=False)
    start_date=db.Column(db.String(),nullable=False)
    end_date=db.Column(db.String(),nullable=False)
    budget=db.Column(db.Integer(),nullable=False)
    type=db.Column(db.String(),nullable=False)
    category=db.Column(db.String(),nullable=False)
    flag=db.Column(db.String(),nullable=False)
    sponsor_id=db.Column(db.Integer(),db.ForeignKey('sponsor.id'),nullable=False)

class Ad(db.Model):
    id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    camp_name=db.Column(db.String(),db.ForeignKey('campaign.name'),nullable=False)
    requirements=db.Column(db.String(),nullable=False)
    payment_amount=db.Column(db.Integer(),nullable=False)
    negotiate_amount=db.Column(db.Integer(),nullable=False)
    status=db.Column(db.String(),nullable=False)
    flag=db.Column(db.String(),nullable=False)
    influencer_id=db.Column(db.Integer(),db.ForeignKey('influencer.id'),nullable=False)

class Request(db.Model):
    id=db.Column(db.Integer(),primary_key=True,autoincrement=True)
    ad_id=db.Column(db.Integer(),db.ForeignKey('ad.id'),nullable=False)
    influencer_id=db.Column(db.Integer(),db.ForeignKey('influencer.id'),nullable=False)
    name=db.Column(db.String(),nullable=False)
    category=db.Column(db.String(),nullable=False)
    niche=db.Column(db.String(),nullable=False)
    platform=db.Column(db.String(),nullable=False)
    followers=db.Column(db.String(),nullable=False)
    sponsor_id=db.Column(db.Integer(),db.ForeignKey('sponsor.id'),nullable=False)

class DailyVisit(db.Model):
    id = db.Column(db.Integer(),primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    date = db.Column(db.Date)
    user = db.relationship('User', backref='visits')
