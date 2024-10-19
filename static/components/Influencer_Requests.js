import Influencer_Base from "./Influencer_Base.js"

export default {
    components:{
        Influencer_Base:Influencer_Base
    },
    data:function(){
        return {
            id:this.$route.params.influencer_id,
            ad_id:0,
            ads:[],
            negotiate_amount:''
        }
    },
    mounted(){
        fetch('/influencer/requests/'+this.id,{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.ads = data
        })
    },
    beforeUpdate(){
        fetch('/influencer/requests/'+this.id,{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.ads = data;
        })
    },
    methods:{
        accept:function(a_id){

            this.ad_id=a_id

            fetch('/influencer/requests/'+a_id+'/accepted',{
                method:'PUT',
                headers:{
                    'Authentication-Token': localStorage.getItem('token')
                }
            })

            this.ad_id=0;
        },

        reject:function(a_id){

            this.ad_id=a_id

            fetch('/influencer/requests/'+a_id+'/rejected',{
                method:'PUT',
                headers:{
                    'Authentication-Token': localStorage.getItem('token')
                }
            })

            this.ad_id=0;
        },

        negotiate:function(){
            console.log(this.negotiate_amount)
            this.negotiate_amount='0';
        }
    },
    template:`
        <Influencer_Base requests="background-color: blueviolet; color: white;" :influencer_id="$route.params.influencer_id" :name="$route.params.influencer_name">
            <h2 style="margin-left: 20px;">Ad Requests</h2>
            
             <h3 style="margin-top: 100px; margin-left: 300px;color: rgb(50, 47, 47);" v-if="ads.length==0">No ad request available</h3>
            
            <div id="campaign_content" v-else>

            <div class="requests_card" v-for="ad in ads">

                    <h4 style="margin-top: 20px;margin-left: 20px;">Campaign Name :   <span style="color: #3874ff;">{{ad.camp_name}}</span></h4>

                    <h5 style="margin-left: 20px;margin-top: 15px;">Payment Amount: <span style="color: #5c6477;">{{ad.payment_amount}}</span></h5>

                    <h5 style="margin-top: 15px;margin-left: 20px;">Requirements :</h5>

                    <p style="margin-top: 10px;margin-left: 20px;font-size: large;">{{ad.requirements}}</p>
                    
                    <div style="width: 250px;height: 40px;margin-left: 40px;margin-top: 20px;">
                        <form>
                            <div class="mb-3">
                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Amount" v-model="negotiate_amount">
                            </div>
                            <button class="btn btn-primary" style="width: 200px;height: 45px;margin-left: 20px;" @click="negotiate" >Negotiate</button>
                        </form>
                    </div>

                    <div style="margin-top: 80px;border-top: 1px solid rgb(157, 160, 165);">

                        <button type="button" class="btn btn-success" style="margin-left: 60px;margin-top:20px;width: 200px;height: 45px;" @click.prevent="accept(ad.id)">Accept</button>

                        <br>

                        <button type="button" class="btn btn-danger" style="margin-left: 60px;margin-top:20px;width: 200px;height: 45px;" @click.prevent="reject(ad.id)">Reject</button>

                    </div>

            </div>
        </div>
        </Influencer_Base>
    `
}