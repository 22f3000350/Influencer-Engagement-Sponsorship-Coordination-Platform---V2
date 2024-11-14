import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    data:function(){
        return {
            id: this.$route.params.sponsor_id,
            ad_id:'',
            ads: []
        }
    },
    mounted(){
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
    methods:{
        Delete:function(a_id){

            this.ad_id=a_id;

            fetch('http://127.0.0.1:5000/ad/'+ this.id +'/'+ this.ad_id,{
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
                    alert("Ad Deleted Successfully");
                }
            })

            this.ad_id='';

        }
    },
    template:`
        <Sponsor_Base delete_ad="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">

            <h1 id="update_campaign_heading">Delete Ad</h1>

            <h2 align="center" v-if="ads.length == 0" >No Ad is available</h2>
            
            <div id="update_campaign_table" v-else>

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
                            <th scope="col" style="text-align: center;">Action</th>

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
                            <td style="text-align: center;"><a style="margin-top: 15px; text-decoration: none;color: red;" href="" @click.prevent="Delete(ad.id)">Delete</a></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
            </div>

        </Sponsor_Base>
    `
}