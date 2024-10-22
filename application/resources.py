from flask_restful import Api,Resource
from .database import *
from flask import request, jsonify
from flask_security import auth_required,roles_required,roles_accepted

api = Api()

class Sponsor_Info(Resource):
    @auth_required('token')
    @roles_required('admin')
    def get(self):
        sponsors = Sponsor.query.all()
        data = []
        for sponsor in sponsors:
            s={}
            s['id']=sponsor.id
            s['name']=sponsor.name
            s['company']=sponsor.company
            s['budget']=sponsor.budget
            s['flag']=sponsor.flag
            data.append(s)

        return data,200

class Campaign_Info(Resource):
    @auth_required('token')
    @roles_accepted('sponsor','admin')
    def get(self,sponsor_id):

        if sponsor_id==20000:
            campaigns = Campaign.query.all()
        else:
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
    @roles_accepted('sponsor','admin')
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
    @auth_required('token')
    @roles_accepted('sponsor','admin')
    def get(self,sponsor_id):

        if sponsor_id==20000:            
            ads=Ad.query.all()
        else:
            sponsor=Sponsor.query.filter_by(id=sponsor_id).first()
            ads=[]
            for camp in sponsor.campaigns:
                ads+=Ad.query.filter_by(camp_name=camp.name).all()

        influencers=Influencer.query.all()

        data = []

        for ad in ads:
            a = {}
            a['id']=ad.id
            a['camp_name']=ad.camp_name
            a['requirements']=ad.requirements
            a['payment_amount']=ad.payment_amount
            a['negotiate_amount']=ad.negotiate_amount
            a['status']=ad.status
            a['flag']=ad.flag
            a['influencer_id']=ad.influencer_id

            for influencer in influencers:
                if influencer.id == ad.influencer_id:
                    a['name']=influencer.name

            data.append(a)

        return data,200


    @auth_required('token')
    @roles_required('sponsor')
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

    @auth_required('token')
    @roles_required('sponsor')
    def put(self,sponsor_id,ad_id):
        payment_amount=request.json["payment_amount"]
        requirements=request.json["requirements"]
        ad=Ad.query.filter_by(id=ad_id).first()
        if len(payment_amount)>0:
            ad.payment_amount=payment_amount
        if len(requirements)>0:
            ad.requirements=requirements

        db.session.commit()

        return {"message":"ok"},200

    @auth_required('token')
    @roles_required('sponsor')
    def delete(self,sponsor_id,ad_id):
        requests=Request.query.filter_by(ad_id=ad_id).all()
        for request in requests:
            db.session.delete(request)
        ad=Ad.query.filter_by(id=ad_id).first()
        db.session.delete(ad)
        db.session.commit()
        return {"message":"ok"},200


class Sponsor_Filter(Resource):
    @auth_required('token')
    @roles_required('sponsor')
    def get(self):
        influencers=Influencer.query.all()
        categorys={}
        for influencer in influencers:
            categorys[influencer.category]=categorys.get(influencer.category,0)+1
        
        return categorys,200
    
    @auth_required('token')
    @roles_required('sponsor')
    def post(self):
        category=request.json["category"]
        search=request.json["search"]

        influencers = Influencer.query.all()

        if category!="all" and len(search)==0:
            influencers=Influencer.query.filter_by(category=category).all() 
        if len(search)>0 and category!="all":
            influencers=[]
            influencers1=Influencer.query.filter_by(category=category).all()
            influencers2=Influencer.query.filter(Influencer.name.like('%{search}%'.format(search=search))).all()
            for i in influencers2:
                for j in influencers1:
                    if i==j:
                        influencers.append(j)
                        
        if len(search)>0 and category=="all":
            influencers=Influencer.query.filter(Influencer.name.like('%{search}%'.format(search=search))).all()

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
    
class Influencer_Filter(Resource):
    @auth_required('token')
    @roles_required('influencer')
    def get(self):
        ads=Ad.query.filter_by(influencer_id=0).all()
        campaigns={}
        for ad in ads:
            campaigns[ad.camp_name]=campaigns.get(ad.camp_name,0)+1

        return campaigns,200
    
    @auth_required('token')
    @roles_required('influencer')
    def post(self):
        campaign=request.json["campaign"]
        search=request.json["search"]

        ads=Ad.query.filter_by(influencer_id=0).all()

        if campaign!="all" and len(search)==0:
            ads=Ad.query.filter_by(influencer_id=0,camp_name=campaign).all() 
        if len(search)>0 and campaign!="all":
            ads=[]
            ads1=Ad.query.filter_by(influencer_id=0,camp_name=campaign).all()
            ads2=Ad.query.filter(Ad.camp_name.like('%{search}%'.format(search=search))).all()
            for i in ads2:
                for j in ads1:
                    if i==j:
                        ads.append(j)
                        
        if len(search)>0 and campaign=="all":
            ads=[]
            ads1=Ad.query.filter_by(influencer_id=0).all()
            ads2=Ad.query.filter(Ad.camp_name.like('%{search}%'.format(search=search))).all()
            for i in ads2:
                for j in ads1:
                    if i==j:
                        ads.append(j)

        data = []

        for ad in ads:
            a = {}
            a['id']=ad.id
            a['camp_name']=ad.camp_name
            a['requirements']=ad.requirements
            a['payment_amount']=ad.payment_amount
            a['negotiate_amount']=ad.negotiate_amount
            a['status']=ad.status
            a['flag']=ad.flag
            a['influencer_id']=ad.influencer_id

            data.append(a)

        return data,200
      
    
class Influencer_Edit(Resource):
    @auth_required('token')
    @roles_required('influencer')
    def post(self,influencer_id):
        data = request.get_json()
        category=data.get("category")
        niche=data.get("niche")
        platform=data.get("platform")
        followers=data.get("followers")
        
        influencer=Influencer.query.filter_by(id=influencer_id).first()

        if len(category)>0:
            influencer.category=category
        if len(niche)>0:
            influencer.niche=niche
        if len(platform)>0:
            influencer.platform=platform
        if len(followers)>0:
            influencer.followers=followers
        
        db.session.commit()

        return {"message":"ok"},200
    

class Influencer_Campaigns(Resource):
    @auth_required('token')
    @roles_required('influencer')
    def get(self):
        ads=Ad.query.filter_by(influencer_id=0).all()
        data = []
        for ad in ads:
            a = {}
            a['id']=ad.id
            a['camp_name']=ad.camp_name
            a['requirements']=ad.requirements
            a['payment_amount']=ad.payment_amount
            a['negotiate_amount']=ad.negotiate_amount
            a['status']=ad.status
            a['flag']=ad.flag
            a['influencer_id']=ad.influencer_id

            data.append(a)

        return data,200
    
    @auth_required('token')
    @roles_required('influencer')
    def put(self,influencer_id,ad_id):
        if ad_id>0:
            ad=Ad.query.filter_by(id=ad_id).first()
            #ad.influencer_id=-1
            request_ad=Request.query.filter_by(ad_id=ad_id,influencer_id=influencer_id).first()
        if request_ad:
            return {"message":"ok"},200
        else:
            influencer=Influencer.query.filter_by(id=influencer_id).first()
            campaign=Campaign.query.filter_by(name=ad.camp_name).first()
            requests=Request(ad_id=ad_id,influencer_id=influencer_id,name=influencer.name,category=influencer.category,niche=influencer.niche,followers=influencer.followers,platform=influencer.platform,sponsor_id=campaign.sponsor_id)
            db.session.add(requests)
            db.session.commit()
            return {"message":"ok"},200
    

    
class Influencer_Requests(Resource):
    @auth_required('token')
    @roles_required('influencer')
    def get(self,influencer_id):
        ads=Ad.query.filter_by(influencer_id=influencer_id,status="Pending",negotiate_amount=0).all()
        data = []
        for ad in ads:
            a = {}
            a['id']=ad.id
            a['camp_name']=ad.camp_name
            a['requirements']=ad.requirements
            a['payment_amount']=ad.payment_amount
            a['negotiate_amount']=ad.negotiate_amount
            a['status']=ad.status
            a['flag']=ad.flag
            a['influencer_id']=ad.influencer_id

            data.append(a)

        return data,200
    
    @auth_required('token')
    @roles_required('influencer')
    def put(self,ad_id,type):
        if ad_id>0 and type=='accepted':
            ad=Ad.query.filter_by(id=ad_id).first()
            ad.status="Accepted"
            db.session.commit()
            return {"message":"ok"},200
    
        if ad_id>0 and type=='rejected':
            ad=Ad.query.filter_by(id=ad_id).first()
            ad.status="Rejected"
            db.session.commit()
            return {"message":"ok"},200
        
    @auth_required('token')
    @roles_required('influencer')
    def post(self,ad_id):
        negotiate_amount=request.json["negotiate_amount"]
        ad=Ad.query.filter_by(id=ad_id).first()
        ad.negotiate_amount=negotiate_amount  
        db.session.commit()

class Influencer_Status(Resource):
    @auth_required('token')
    @roles_required('influencer')
    def get(self,influencer_id):
        ads=Ad.query.filter_by(influencer_id=influencer_id).all()
        data = []
        for ad in ads:
            a = {}
            a['id']=ad.id
            a['camp_name']=ad.camp_name
            a['requirements']=ad.requirements
            a['payment_amount']=ad.payment_amount
            a['negotiate_amount']=ad.negotiate_amount
            a['status']=ad.status
            a['flag']=ad.flag
            a['influencer_id']=ad.influencer_id

            data.append(a)

        return data,200


api.add_resource(Campaign_Api,'/campaign/<int:sponsor_id>','/campaign/<int:sponsor_id>/<int:campaign_id>')
api.add_resource(Influencer_Info,'/info/influencer')
api.add_resource(Campaign_Info,'/info/campaign/<int:sponsor_id>')
api.add_resource(Ad_Api,'/ad/<int:sponsor_id>/<type>/<int:influencer_id>','/ad/<int:sponsor_id>','/ad/<int:sponsor_id>/<int:ad_id>')
api.add_resource(Sponsor_Filter,'/sponsor_filter')
api.add_resource(Influencer_Edit,'/influencer/edit/<int:influencer_id>')
api.add_resource(Influencer_Campaigns,'/influencer/campaigns','/influencer/campaigns/<int:influencer_id>/<int:ad_id>')
api.add_resource(Influencer_Requests,'/influencer/requests/<int:influencer_id>','/influencer/requests/<int:ad_id>/<type>','/influencer/requests/<int:ad_id>')
api.add_resource(Influencer_Status,'/influencer/status/<int:influencer_id>')
api.add_resource(Influencer_Filter,'/influencer/filter')
api.add_resource(Sponsor_Info,'/sponsor_info')