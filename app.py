from flask import Flask, send_file
from flask_cors import CORS
from config import LocalDevelopmentConfig
from application.database import *
from application.resources import *
from flask_security import Security,SQLAlchemyUserDatastore,hash_password
from application.worker import celery_init_app
from application.tasks import *
from celery.schedules import crontab
import flask_excel as excel

app = Flask(__name__)
cors = CORS(app)
app.config.from_object(LocalDevelopmentConfig)
db.init_app(app)
api.init_app(app)
cache.init_app(app)
datastore=SQLAlchemyUserDatastore(db,User,Role)
app.security=Security(app,datastore)
celery_app = celery_init_app(app)
excel.init_excel(app)
app.app_context().push()

with app.app_context():
    db.create_all()
    app.security.datastore.find_or_create_role(name="admin",description="This is admin")
    app.security.datastore.find_or_create_role(name="sponsor",description="This is sponsor")
    app.security.datastore.find_or_create_role(name="influencer",description="This is influencer")
    if not app.security.datastore.find_user(email="admin123@gmail.com"):
        app.security.datastore.create_user(email="admin123@gmail.com",username="admin",password=hash_password('1234'),roles=['admin'])
    
    db.session.commit()

@celery_app.task
def export_csv(sponsor_id):
    campaigns = Campaign.query.filter_by(sponsor_id=sponsor_id).all()

    csv = excel.make_response_from_query_sets(campaigns,['id','name','description','start_date','end_date','budget','type','category','flag','sponsor_id'],'csv')

    filename = str(sponsor_id) + '_' + str(random.randint(1, 10000000)) + '.csv'

    with open(f'./CSV/{filename}','wb') as file:
        file.write(csv.data)

    return filename

from application.controller import *

@app.route('/export_csv/<sponsor_id>')
def create_csv(sponsor_id):
    
    task = export_csv.delay(sponsor_id)

    while not(task.ready()):

        if task.ready():
            file_path = './CSV/' + task.result
            return send_file(file_path, as_attachment=True, download_name=f"sponsor_{sponsor_id}_report.csv")
        
    return {"error": "File not found"}, 404

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    
    sender.add_periodic_task(crontab(hour=18, minute=30), daily_reminder.s(), name="Daily Reminder")

    sender.add_periodic_task(crontab(hour=18, minute=31, day_of_month='1'), monthly_report.s(), name='Monthly Report')


if __name__=='__main__':
    app.run()