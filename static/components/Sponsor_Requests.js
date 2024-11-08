import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    data:function(){
        return {
            id:this.$route.params.sponsor_id,
            requests:[]
        }
    },
    mounted(){
        fetch('/sponsor_requests/'+this.id,{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.requests = data
        })
    },
    methods:{
        Request:function(influencer_id,status,ad_id){

            fetch('/sponsor_requests/'+influencer_id + '/' + status + '/' + ad_id,{
                method:'PUT',
                headers:{
                    'Authentication-Token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message == "ok"){
                    alert("Ad Request Updated")
                }
            })

        }
    },
    template:`
        <Sponsor_Base requests="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id"> 
            <h1 style="margin-left: 30px;margin-top: 30px;">Ad Request</h1>

            <h1 align="center" style="margin-top: 60px;" v-if="requests.length == 0" >No request available</h1>
            
            <div id="new_ad_content" v-else>
            
                <div class="sponsor_requests_card" v-for="request in requests">

                    <div style="height:300px;width: 250px;">

                        <img src="/static/images/profile image.jpg" width="220px" style="margin-left: 20px;margin-top: 30px;">

                    </div> 

                    <div style="height: 300px;width: 350px;position: relative;left: 250px;bottom: 300px;margin-top: 30px;">

                        <h4 style="margin-top: 10px;margin-left: 20px;">Name :   <span style="color: #3874ff;">{{request.name}}</span></h4>

                        <h6 style="margin-left: 20px;">Ad ID: <span style="color: #5c6477;">{{request.ad_id}}</span></h6>

                        <h6 style="margin-left: 20px;">Category: <span style="color: #5c6477;">{{request.category}}</span></h6>

                        <h6 style="margin-left: 20px;">Niche: <span style="color: #5c6477;">{{request.niche}}</span></h6>

                        <h6 style="margin-left: 20px;">Platform: <span style="color: #5c6477;">{{request.platform}}</span></h6>

                        <h6 style="margin-left: 20px;">Followers: <span style="color: #5c6477;">{{request.followers}}</span></h6>

                        <div style="height: 50px;display: flex; flex-direction: row;margin-top: 20px;">

                            <button type="button" class="btn btn-success" style="margin-left: 15px;margin-top:10px;width: 150px;height: 45px;" @click="Request(request.influencer_id,'accept',request.ad_id)" >Accept</button>

                            <button type="button" class="btn btn-danger" style="margin-left: 15px;margin-top:10px;width: 150px;height: 45px;" @click="Request(request.influencer_id,'reject',request.ad_id)" >Reject</button>

                        </div>

                    </div>

                </div>

            </div>

        </Sponsor_Base>
    `
}