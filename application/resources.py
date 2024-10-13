from flask_restful import Api,Resource
from .database import *
from flask import request, jsonify
from flask_security import auth_required,roles_required

api = Api()

class Campaign_Info(Resource):
    @auth_required('token')
    @roles_required('sponsor')
    def get(self,sponsor_id):
        campaigns = Campaign.query.filter_by(sponsor_id=sponsor_id).all()
        data=[]
        for campaign in campaigns:
            c={}
            c['id']=campaign.id
            c['name']=campaign.name
            c['description']=campaign.description
            c['start_date']=campaign.start_date
            c['end_date']=campaign.end_date
            c['budget']=campaign.budget
            c['type']=campaign.type
            c['category']=campaign.category
            c['flag']=campaign.flag
            c['sponsor_id']=campaign.sponsor_id
            data.append(c)

        return data,200


class Influencer_Info(Resource):
    @auth_required('token')
    @roles_required('sponsor')
    def get(self):
        influencers = Influencer.query.all()
        data = []
        for influencer in influencers:
            i={}
            i['id']=influencer.id
            i['name']=influencer.name
            i['category']=influencer.category
            i['niche']=influencer.niche
            i['platform']=influencer.platform
            i['followers']=influencer.followers
            i['flag']=influencer.flag
            data.append(i)

        return data,200

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
    
      
    @auth_required('token')
    @roles_required('sponsor')
    def delete(self,sponsor_id,campaign_id):
        campaign=Campaign.query.filter_by(id=campaign_id).first()
        ads=Ad.query.filter_by(camp_name=campaign.name).all()
        for ad in ads:
            requests=Request.query.filter_by(ad_id=ad.id).all()
            for request in requests:
                db.session.delete(request)
                
            db.session.delete(ad)

        db.session.delete(campaign)
        db.session.commit()

        return {"message":"ok"},200
    

class Ad_Api(Resource):
    def get(self):
        pass

    def post(self,sponsor_id,type,influencer_id):
        if influencer_id>0:
            if type=="private":
                data = request.get_json()
                camp_name=data.get("camp_name")
                payment_amount=data.get("payment_amount")
                requirements=data.get("requirements")
                ad=Ad(camp_name=camp_name,requirements=requirements,payment_amount=payment_amount,negotiate_amount=0,status="Pending",flag="False",influencer_id=influencer_id)
                db.session.add(ad)
                db.session.commit()
                return {"message":"ok"}
            
        if  type=="public":
            data = request.get_json()
            camp_name=data.get("camp_name")
            payment_amount=data.get("payment_amount")
            requirements=data.get("requirements")
            ad=Ad(camp_name=camp_name,requirements=requirements,payment_amount=payment_amount,negotiate_amount=0,status="Pending",flag="False",influencer_id=0)
            db.session.add(ad)
            db.session.commit()
            return {"message":"ok"}



api.add_resource(Campaign_Api,'/campaign/<int:sponsor_id>','/campaign/<int:sponsor_id>/<int:campaign_id>')
api.add_resource(Influencer_Info,'/info/influencer')
api.add_resource(Campaign_Info,'/info/campaign/<int:sponsor_id>')
api.add_resource(Ad_Api,'/ad/<int:sponsor_id>/<type>/<int:influencer_id>')
