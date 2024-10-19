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
        fetch('/influencer/status/'+this.id,{
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
        <Influencer_Base status="background-color: blueviolet; color: white;" :influencer_id="$route.params.influencer_id" :name="$route.params.influencer_name">

            <h1 style="margin-top: 100px; margin-left: 500px;color: rgb(50, 47, 47);" v-if="ads.length==0">No ad requests available</h1> 

            <div id="main_content" v-else>

                <h2 style="margin-left: 30px;margin-top: 30px;">Ad Status</h2>

                <div id="table_content">

                    <table class="table">
                        <thead style="border-top: 1px solid rgba(0, 0, 0, 0.108);">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Campaign Name</th>
                            <th scope="col">Requirements</th>
                            <th scope="col" style="text-align: center;">Amount</th>
                            <th scope="col" style="text-align: center;">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        <tr v-for="ad in ads">

                            <td><p style="margin-top: 15px;">{{ad.id}}</p></td>
                            <td><p style="margin-top: 15px;">{{ad.camp_name}}</p></td>
                            <td><p style="margin-top: 15px;">{{ad.requirements}}</p></td>
                            <td style="text-align: center;"><p style="margin-top: 15px;">{{ad.payment_amount}}</p></td>
                            <td v-if=" ad.status=='Rejected' "><span style="background-color: rgba(253, 150, 150, 0.295);width: 80px;height: 25px; display: inline-block;border: 1px solid rgba(246, 51, 51, 0.519);border-radius: 5px;color: red;text-align: center;">{{ad.status}}</span></td>
                            <td v-if=" ad.status=='Accepted' "><span style="background-color: rgba(132, 243, 145, 0.333);width: 80px;height: 25px; display: inline-block;border: 1px solid rgb(54, 238, 54);border-radius: 5px;color: green;text-align: center;">{{ad.status}}</span></td>
                            <td v-if=" ad.status=='Pending' "><span style="background-color: #C7EBFF;width: 80px;height: 25px; display: inline-block;border: 1px solid #60c6ff;border-radius: 5px;color:#005585;text-align: center;">{{ad.status}}</span></td>
                
                        </tr>

                        </tbody>
                    </table>

                </div>

            </div>
        </Influencer_Base>
    `
}