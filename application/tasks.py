from celery import shared_task
import flask_excel as excel
from .mail_service import send_message
from .database import *
from jinja2 import Template

@shared_task(ignore_result=True)
def daily_reminder():
    users = User.query.filter(User.roles.any(Role.name == 'influencer')).all()
    for user in users:
        send_message(user.email, "Testing the Email",f"<h1> {user.email} <h1>")

    return "ok"