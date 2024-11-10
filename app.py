from flask import Flask
from flask_cors import CORS
from config import LocalDevelopmentConfig
from application.database import *
from application.resources import *
from flask_security import Security,SQLAlchemyUserDatastore,hash_password
from application.worker import celery_init_app
from application.tasks import *
from celery.schedules import crontab

app = Flask(__name__)
cors = CORS(app)
app.config.from_object(LocalDevelopmentConfig)
db.init_app(app)
api.init_app(app)
datastore=SQLAlchemyUserDatastore(db,User,Role)
app.security=Security(app,datastore)
celery_app = celery_init_app(app)
app.app_context().push()

with app.app_context():
    db.create_all()
    app.security.datastore.find_or_create_role(name="admin",description="This is admin")
    app.security.datastore.find_or_create_role(name="sponsor",description="This is sponsor")
    app.security.datastore.find_or_create_role(name="influencer",description="This is influencer")
    if not app.security.datastore.find_user(email="admin123@gmail.com"):
        app.security.datastore.create_user(email="admin123@gmail.com",username="admin",password=hash_password('1234'),roles=['admin'])
    
    db.session.commit()

from application.controller import *

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    
    sender.add_periodic_task(300.0, daily_reminder.s(), name='add every 300')

    sender.add_periodic_task(30.0, monthly_report.s(), name='add every 300')


if __name__=='__main__':
    app.run()