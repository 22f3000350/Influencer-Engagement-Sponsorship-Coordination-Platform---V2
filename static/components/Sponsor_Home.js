import sponsor_base from "./Sponsor_Base.js"

export default {
    components:{
        sponsor_base:sponsor_base
    },
    data:function(){
        return {
            id:this.$route.params.sponsor_id,
            campaigns: [],
            ads: []
        }
    },
    computed:{
        num_campaigns:function(){
            return this.campaigns.length
        },
        num_ads:function(){
            return this.ads.length
        },
    },
    mounted(){

        fetch('http://127.0.0.1:5000/campaign/'+this.id,{
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

        fetch('http://127.0.0.1:5000/ad/'+this.id,{
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
        <sponsor_base home="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">
            <div id="home_content">

                <h1 style="font-size: 37px;margin-left: 20px;margin-top: 30px;font-weight: 800;color: #141824;font-family: sans-serif;">Sponsor Dashboard</h1>
                
                <div style="display: flex;flex-direction: row;gap: 50px;;margin-top: 40px;margin-left: 30px;">

                    <div style="width: 250px; height: 250px;">

                    <h1 style="font-size: 160px;text-align: center;font-family: sans-serif;">{{num_campaigns}}</h1>

                    <h4 style="font-family: sans-serif;">Number of Campaign</h4>

                    </div>

                    <div style="width: 250px; height: 250px;">

                    <h1 style="font-size: 160px;text-align: center;font-family: sans-serif;">{{num_ads}}</h1>

                    <h4 style="text-align: center;font-family: sans-serif;">Number of Ads</h4>

                    </div>

                </div>
            </div>

            <div id="home_campaign_table">

                <div id="home_campaign_content">

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col" style="text-align: center;">ID</th>
                        <th scope="col" style="text-align: center;">Campaign Name</th>
                        <th scope="col" style="text-align: center;">Category</th>
                        <th scope="col" style="text-align: center;">Visibility</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="campaign in campaigns">
                            <td><p style="margin-top: 15px;">{{campaign.id}}</p></td>
                            <td><p style="color:#3874FF; margin-top: 15px;">{{campaign.name}}</p></td>
                            <td><p style="margin-top: 15px;">{{campaign.category}}</p></td>
                            <td v-if="campaign.type=='Private'"><span style="background-color: rgba(253, 150, 150, 0.295);width: 80px;height: 25px; display: inline-block;border: 1px solid rgba(246, 51, 51, 0.519);border-radius: 5px;color: red;text-align: center;">{{campaign.type}}</span></td>
                            <td v-else><span style="background-color: rgba(132, 243, 145, 0.333);width: 80px;height: 25px; display: inline-block;border: 1px solid rgb(54, 238, 54);border-radius: 5px;color: green;text-align: center;">{{campaign.type}}</span></td>
                    </tr>        
                    </tbody>
                </table>

                </div>

            </div>

            <div id="update_campaign_table" style="position: relative;bottom: 470px;">

                <div class="table-responsive scrollbar" id="campaign_table">

                    <table class="table" id="campaign_table">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Influencer Name</th>
                            <th scope="col">Campaign Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Requirements</th>
                            <th scope="col" style="text-align: center;">Payment Amount</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for=" ad in ads ">
                            <td><p style="margin-top: 15px;">{{ad.id}}</p></td>
                            <td v-if=" ad.influencer_id<=0 "><p style="color:#3874FF; margin-top: 15px;"><img src="./static/images/profile image.jpg" width="30px" >    Not Available</p></td> 
                            <td v-if=" ad.influencer_id>0 "><p style="color:#3874FF; margin-top: 15px;"><img src="./static/images/profile image.jpg" width="30px" >    {{ad.name}}</p></td>  
                            <td><p style="margin-top: 15px;">{{ad.camp_name}}</p></td>
                            <td v-if=" ad.status=='Rejected' "><span style="background-color: rgba(253, 150, 150, 0.295);width: 80px;height: 25px; display: inline-block;border: 1px solid rgba(246, 51, 51, 0.519);border-radius: 5px;color: red;text-align: center;">{{ad.status}}</span></td>
                            <td v-if=" ad.status=='Accepted' "><span style="background-color: rgba(132, 243, 145, 0.333);width: 80px;height: 25px; display: inline-block;border: 1px solid rgb(54, 238, 54);border-radius: 5px;color: green;text-align: center;">{{ad.status}}</span></td>
                            <td v-if=" ad.status=='Pending' "><span style="background-color: #C7EBFF;width: 80px;height: 25px; display: inline-block;border: 1px solid #60c6ff;border-radius: 5px;color:#005585;text-align: center;">{{ad.status}}</span></td>
                            <td><p style="margin-top: 15px;">{{ad.requirements}}</p></td>
                            <td style="text-align: center;"><p style="margin-top: 15px;">{{ad.payment_amount}}</p></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
            </div>


        </sponsor_base>
    `
}