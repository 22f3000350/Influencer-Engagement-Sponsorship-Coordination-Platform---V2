import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    data:function(){
        return {
            id:this.$route.params.sponsor_id,
            type:'private',
            form: false,
            influencers:[],
            campaigns:[],
            ad:{
                camp_name:'',
                payment_amount:'',
                requirements:''
            },
            influencer_id:0,
            categorys:[],
            find:{
                category:'',
                search:''
            }
        }
    },
    mounted(){

        fetch('http://127.0.0.1:5000/info/influencer',{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.influencers = data
        })


        fetch('http://127.0.0.1:5000/info/campaign/'+this.id,{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.campaigns = data
        })

        
        fetch('http://127.0.0.1:5000/sponsor_filter',{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.categorys = data
        })
        
    },
    methods:{
        change:function(){


            if(this.type == 'private'){
                this.type='public'
            }
            else{
                this.type='private'
            }

           this.form = false
        },
        create:function(){
            event.preventDefault(); 
            const form = this.$refs.myForm;

            if(form.checkValidity()){
                fetch('http://127.0.0.1:5000/ad/'+ this.id + '/' + this.type + '/' + this.influencer_id,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(this.ad)
                })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    if(data.message=="ok"){
                        alert("Ad Created Successfully");
                        this.ad.camp_name='',
                        this.ad.payment_amount='',
                        this.ad.requirements=''
                        this.influencer_id=0
                        this.form=false
                    }
                })
                
            }
            else{
                form.reportValidity();
            }  
        },

        filter:function(){

            fetch('http://127.0.0.1:5000/sponsor_filter',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.find)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.influencers = data
                this.find.search=''
            })

        }

    },
    template:`
        <Sponsor_Base new_ad="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">

            <h1 style="margin-top: 30px; margin-left: 30px;">Create AD</h1>

            <div v-if=" type == 'private' ">

                <div style="width: 1330px;height: 50px;margin-left: 30px;margin-top: 20px;">
                    <button class="new_ad_button" style="background-color:blueviolet;color: white;">Private</button>
                    <button class="new_ad_button" style="position: relative;right: 5px;" @click="change">Public</button>
                    
                        <div id="sponsor_search_bar" v-if="!form">
                            <form>
                                <div>
                                    <select class="form-select" aria-label="Default select example" id="sponsor_filter" v-model="find.category">
                                    <option selected value="all">All</option>
                                        <option v-for="(value, key) in categorys" :value="key">{{key}}</option>   
                                    </select>
                                </div>
                            
                                <div class="mb-3">
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style="height: 50px;" placeholder="Search Influencer" v-model="find.search">
                                    <button class="btn btn-primary" id="sponsor_search" @click="filter">Search</button>
                                </div>
                            </form>
                        </div>
                </div>

                <div id="new_ad_content" v-if="!form">

                    <div class="new_ad_card" v-for="influencer in influencers">
                
                            <img src="/static/images/profile image.jpg" width="200px" style="margin-left: 37px;margin-top: 15px;">

                            <h4 style="margin-top: 10px;margin-left: 20px;">Name :   <span style="color: #3874ff;">{{influencer.name}}</span></h4>

                            <h6 style="margin-left: 20px;">Category: <span style="color: #5c6477;">{{influencer.category}}</span></h6>

                            <h6 style="margin-left: 20px;">Niche: <span style="color: #5c6477;">{{influencer.niche}}</span></h6>

                            <h6 style="margin-left: 20px;">Platform: <span style="color: #5c6477;">{{influencer.platform}}</span></h6>

                            <h6 style="margin-left: 20px;">Followers: <span style="color: #5c6477;">{{influencer.followers}}</span></h6>

                        <button id="new_ad_request_button" @click="form = true; influencer_id = influencer.id">Request</button>
        
                    </div>
                
                </div>
                    

                    <div id="new_ad_form" v-if="form">

                        <form ref="myForm">

                            <div class="row">
                                <div class="col">
                                    <select class="form-select" aria-label="Default select example" style="height: 50px;width: 400px;" v-model="ad.camp_name" required>
                                        <option v-for="campaign in campaigns" v-if=" campaign.type=='Private' " :value="campaign.name">{{campaign.name}}</option>
                                    </select>
                                </div>

                            <div class="col">
                                <input type="number" class="form-control" placeholder="Payment Amount" aria-label="Last name" style="height: 50px;width: 220px;" v-model="ad.payment_amount" required>
                            </div>
                            </div>

                            <br>

                            <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Requirements" v-model="ad.requirements" required></textarea>
                            </div>

                            <br>

                            <button class="btn btn-primary" style="width: 200px;height: 50px;margin-left: 20px;" @click="create" >Create Ad</button>

                        </form>

                    </div>

            </div>

            <div v-if=" type == 'public' ">
                            
                <div style="width: 500px;height: 50px;margin-left: 30px;margin-top: 20px;">
                    <button class="new_ad_button" @click="change">Private</button>
                    <button class="new_ad_button" style="position: relative;right: 5px;background-color:blueviolet;color: white;" >Public</button>
                </div>
                
                    <div id="new_ad_form">

                        <form ref="myForm">

                            <div class="row">
                                <div class="col">
                                    <select class="form-select" aria-label="Default select example" style="height: 50px;width: 400px;" v-model="ad.camp_name" required>
                                        <option v-for="campaign in campaigns" v-if=" campaign.type=='Public' " :value="campaign.name">{{campaign.name}}</option>
                                    </select>
                                </div>

                            <div class="col">
                                <input type="number" class="form-control" placeholder="Payment Amount" aria-label="Last name" style="height: 50px;width: 220px;" v-model="ad.payment_amount" required>
                            </div>
                            </div>

                            <br>

                            <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Requirements" v-model="ad.requirements" required></textarea>
                            </div>

                            <br>

                            <button class="btn btn-primary" style="width: 200px;height: 50px;margin-left: 20px;" @click="create" >Create Ad</button>

                        </form>

                    </div>


                        
            </div>

        </Sponsor_Base>
    `
}