from flask import Flask
from config import LocalDevelopmentConfig
from application.database import *
from flask_security import Security,SQLAlchemyUserDatastore,hash_password

app = Flask(__name__)
app.config.from_object(LocalDevelopmentConfig)
db.init_app(app)
datastore=SQLAlchemyUserDatastore(db,User,Role)
app.security=Security(app,datastore)
app.app_context().push()

with app.app_context():
    db.create_all()
    app.security.datastore.find_or_create_role(name="admin",description="This is admin")
    app.security.datastore.find_or_create_role(name="sponsor",description="This is sponsor")
    app.security.datastore.find_or_create_role(name="influencer",description="This is influencer")
    if not app.security.datastore.find_user(email="admin123@gmail.com"):
        app.security.datastore.create_user(email="admin123@gmail.com",password=hash_password('1234'),roles=['admin'])
    
    db.session.commit()

from application.controller import *

if __name__=='__main__':
    app.run()