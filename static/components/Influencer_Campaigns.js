import Influencer_Base from "./Influencer_Base.js"

export default {
    components:{
        Influencer_Base:Influencer_Base
    },
    data:function(){
        return {
            id:this.$route.params.influencer_id,
            ads:[]
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
    },
    template:`
        <Influencer_Base campaigns="background-color: blueviolet; color: white;" :influencer_id="$route.params.influencer_id" :name="$route.params.influencer_name">
            <div>

                <br>

                <h2 style="margin-left: 20px;">Public Campaigns</h2>

                <div id="campaign_content">
                        <div class="campaign_card" v-for="ad in ads">
                            <h5 style="margin-top: 20px;margin-left: 20px;color: white;">Campaign Name :   <span style="color: black;font-size: larger;position: relative; top: 2px;left: 5px;">{{ad.camp_name}}</span></h5>
                            
                            <h5 style="margin-top: 20px;margin-left: 20px;">Requirements :</h5>
                            <p style="margin-top: 10px;margin-left: 20px;font-size: large;">{{ad.requirements}}</p>
                            <button id="influencer_request_button">Request</button>
                        </div>
                </div>

            </div>

        </Influencer_Base>
    `
}