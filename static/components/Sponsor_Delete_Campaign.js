import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    data:function(){
        return {
            id: this.$route.params.sponsor_id,
            campaign_id:'',
            campaigns: []
        }
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
    },
    beforeUpdate(){
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
    },
    methods:{
        Delete:function(camp_id){
            this.campaign_id=camp_id;

            fetch('http://127.0.0.1:5000/campaign/'+ this.id +'/'+ this.campaign_id,{
                method:'DELETE',
                headers: {
                    'Authentication-Token': localStorage.getItem('token')
                },
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message=="ok"){
                    alert("Campaign Deleted Successfully");
                }
            })

            this.campaign_id='';

        }
    },
    template:`
        <Sponsor_Base delete_campaign="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">
            <h1 id="update_campaign_heading">Delete Campaign</h1>

            <h2 align="center" v-if="campaigns.length == 0" >No campaign is available</h2>

            <div id="update_campaign_table" v-else >

                <div class="table-responsive scrollbar" id="campaign_table">

                    <table class="table" id="campaign_table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Campaign Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Visiability</th>
                        <th scope="col">Start_Date</th>
                        <th scope="col">End_Date</th>
                        <th scope="col">Budget</th>
                        <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="campaign in campaigns">
                            <td><p style="margin-top: 15px;">{{campaign.id}}</p></td>
                            <td><p style="color:#3874FF; margin-top: 15px;">{{campaign.name}}</p></td>
                            <td><p style="margin-top: 15px;">{{campaign.category}}</p></td>
                                <td v-if="campaign.type=='Private'"><span style="background-color: rgba(253, 150, 150, 0.295);width: 80px;height: 25px; display: inline-block;border: 1px solid rgba(246, 51, 51, 0.519);border-radius: 5px;color: red;text-align: center;">{{campaign.type}}</span></td>
                                <td v-else><span style="background-color: rgba(132, 243, 145, 0.333);width: 80px;height: 25px; display: inline-block;border: 1px solid rgb(54, 238, 54);border-radius: 5px;color: green;text-align: center;">{{campaign.type}}</span></td>
                            <td><p style="margin-top: 15px;">{{campaign.start_date}}</p></td>
                            <td><p style="margin-top: 15px;">{{campaign.end_date}}</p></td>
                            <td><p style="margin-top: 15px;">{{campaign.budget}}</p></td>
                            <td><a style="margin-top: 15px; text-decoration: none;color: red;" href="" @click.prevent="Delete(campaign.id)">Delete</a></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

        </Sponsor_Base>
    `
}