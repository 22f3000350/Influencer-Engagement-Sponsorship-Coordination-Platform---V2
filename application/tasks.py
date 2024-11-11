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
            send_message(user.email, "BookQuest | Monthly Report",
                         template.render(name=sponsor.name,campaigns=campaigns,ads=ads))
            
    return "OK"

@shared_task(ignore_result=True)
def export_csv(sponsor_id):
    campaigns = Campaign.query.filter_by(sponsor_id=sponsor_id).all()

    csv = excel.make_response_from_query_sets(campaigns,['id','name','description','start_date','end_date','budget','type','category','flag','sponsor_id'],'csv')

    filename = str(sponsor_id) + '_' + str(random.randint(1, 10000000)) + '.csv'

    with open(f'../CSV/{filename}','wb') as file:
        file.write(csv.data)

    return filename