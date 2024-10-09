from flask_restful import Api,Resource
from .database import *
from flask import request, jsonify
from flask_security import auth_required,roles_required

api = Api()

class Campaign_Api(Resource):
    @auth_required('token')
    @roles_required('sponsor')
    def get(self,sponsor_id):
        sponsor=Sponsor.query.filter_by(id=sponsor_id).first()
        campaigns=sponsor.campaigns
        data = []
        for campaign in campaigns:
            camp = {}
            camp['id']=campaign.id
            camp['name'] = campaign.name
            camp['budget'] = campaign.budget
            camp['category'] = campaign.category
            camp['type'] = campaign.type
            camp['start_date'] = campaign.start_date
            camp['end_date'] = campaign.end_date
            camp['description'] = campaign.description
            data.append(camp)

        return data,200

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
    
    @auth_required('token')
    @roles_required('sponsor')
    def put(self,sponsor_id,campaign_id):
        data = request.get_json()
        budget=data.get("budget")
        category=data.get("category")
        start_date=data.get("start_date")
        end_date=data.get("end_date")
        description=data.get("description")

        campaign=Campaign.query.filter_by(id=campaign_id).first()
    
        if len(budget)>0:
            campaign.budget=budget
        if len(category)>0:
            campaign.category=category
        if len(start_date)>0:
            campaign.start_date=start_date
        if len(end_date)>0:
            campaign.end_date=end_date
        if len(description)>0:
            campaign.description=description

        db.session.commit()

        return {"message":"ok"},200



api.add_resource(Campaign_Api,'/campaign/<int:sponsor_id>','/campaign/<int:sponsor_id>/<int:campaign_id>')
