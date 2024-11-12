from celery import shared_task
import flask_excel as excel
from .mail_service import send_message
from .database import *
from jinja2 import Template
from datetime import datetime, timedelta
import random

@shared_task(ignore_result=True)
def daily_reminder():
    users = User.query.filter(User.roles.any(Role.name == 'influencer')).all()
    for user in users:
        daily_visit = DailyVisit.query.filter_by(user_id=user.id, date=datetime.today().strftime('%Y-%m-%d')).count()
        influencer = Influencer.query.filter_by(name=user.username).first()
        ads = Ad.query.filter_by(influencer_id=influencer.id,status="Pending").all()
        if len(ads)>=1 or daily_visit==0:
            with open('daily_reminder.html', 'r') as f:
                template = Template(f.read())
                send_message(user.email, "Don't Miss Out! Check Your Daily Ad Requests Now",
                             template.render(name=influencer.name,ads=ads,daily_visit=daily_visit))
        else:
            continue 
    return "OK"

@shared_task(ignore_result=True)
def monthly_report():
    users = User.query.filter(User.roles.any(Role.name == 'sponsor')).all()
    print(users)
    for user in users:
        sponsor = Sponsor.query.filter_by(name=user.username).first()
        campaigns = Campaign.query.filter_by(sponsor_id=sponsor.id).all()
        ads=[]
        for camp in sponsor.campaigns:
            ads+=Ad.query.filter_by(camp_name=camp.name).all()

        with open('monthly_report.html', 'r') as f:
            template = Template(f.read())
            send_message(user.email, "Monthly Report is Here",
                         template.render(name=sponsor.name,campaigns=campaigns,ads=ads))
            
    return "OK"