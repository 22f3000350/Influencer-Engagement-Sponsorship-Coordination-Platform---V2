import Influencer_Base from "./Influencer_Base.js"

export default {
    components:{
        Influencer_Base:Influencer_Base
    },
    data:function(){
        return {
            id:this.$route.params.influencer_id,
            ads:[],
            ad_id:0,
            campaigns:[],
            filter:{
                campaign:'',
                search:''
            }
        }
    },
    mounted(){
        fetch('/influencer/campaigns',{
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

        fetch('/influencer/filter',{
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
    },
    methods:{
        request:function(ad_id){
            
            fetch('http://127.0.0.1:5000/influencer/campaigns/'+ this.id +'/'+ ad_id,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message=="ok"){
                    alert("Request Sent Successfully");                
                }
            })
        },

        search:function(){

            fetch('http://127.0.0.1:5000/influencer/filter',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.filter)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.ads = data
                this.filter.search=''
            })

        }
    },
    template:`
        <Influencer_Base campaigns="background-color: blueviolet; color: white;" :influencer_id="$route.params.influencer_id" :name="$route.params.influencer_name">
            <div>

                <br>

                <h2 style="margin-left: 20px;">Public Campaigns</h2>

                <div id="search_bar">
                    <form>
                    <div>
                        <select class="form-select" aria-label="Default select example" id="filter" v-model="filter.campaign">
                            <option selected value="all">All</option>
                            <option :value="key" v-for="(value, key) in campaigns">{{key}}</option>     
                        </select>
                    </div>
                
                    <div class="mb-3">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style="height: 50px;" placeholder="Search Campaign" v-model="filter.search">
                        <button class="btn btn-primary" id="search" @click="search">Search</button>
                    </div>
                    </form>
                </div>
            </div>

                <div id="campaign_content">
                        <div class="campaign_card" v-for="ad in ads">
                            <h5 style="margin-top: 20px;margin-left: 20px;color: white;">Campaign Name :   <span style="color: black;font-size: larger;position: relative; top: 2px;left: 5px;">{{ad.camp_name}}</span></h5>
                            
                            <h5 style="margin-top: 20px;margin-left: 20px;">Requirements :</h5>
                            <p style="margin-top: 10px;margin-left: 20px;font-size: large;">{{ad.requirements}}</p>
                            <button id="influencer_request_button" @click="request(ad.id)">Request</button>
                        </div>
                </div>

            </div>

        </Influencer_Base>
    `
}