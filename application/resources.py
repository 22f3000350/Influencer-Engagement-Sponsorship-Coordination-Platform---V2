from flask_restful import Api,Resource
from .database import *
from flask import request
from flask_security import auth_required,roles_required

api = Api()

class Campaign_Api(Resource):
    def get(self):
        pass
    @auth_required('token')
    @roles_required('sponsor')
    def post(self,sponsor_id):
        data = request.get_json()
        name=data.get("name")
        budget=data.get("budget")
        category=data.get("category")
        type=data.get("type")
        start_date=data.get("start_date")
        end_date=data.get("end_date")
        description=data.get("description")
        campaign=Campaign(name=name,budget=budget,category=category,type=type,start_date=start_date,end_date=end_date,description=description,flag="False",sponsor_id=sponsor_id)
        db.session.add(campaign)
        db.session.commit()
        return {"message":"ok"},200


api.add_resource(Campaign_Api,'/campaign/new/<int:sponsor_id>')
