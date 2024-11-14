import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    data:function(){
        return {
            id: this.$route.params.sponsor_id,
            campaigns: [],
            type:'view',
            campaign:{
                budget:'',
                category:'',
                start_date:'',
                end_date:'',
                description:''
            },
            campaign_id:''
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
    methods:{
        change:function(camp_id){
            this.type='update';
            this.campaign_id=camp_id;
        },
        update:function(){

            fetch('http://127.0.0.1:5000/campaign/'+ this.id +'/'+ this.campaign_id,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.campaign)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message=="ok"){
                    alert("Campaign Updated Successfully");
                    this.campaign.budget='';
                    this.campaign.category='';
                    this.campaign.start_date='';
                    this.campaign.end_date='';
                    this.campaign.description='';
                }
            })

            this.campaign_id='';
            this.type='view';
        }
    },
    template:`
        <Sponsor_Base update_campaign="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">
            <h1 id="update_campaign_heading">Update Campaign</h1>

            <h2 align="center" v-if="campaigns.length == 0" >No campaign is available</h2>

            <div id="update_campaign_table" v-if="type == 'view' && campaigns.length>0">

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
                            <td><a style="margin-top: 15px; text-decoration: none;" href="" @click.prevent="change(campaign.id)">Update</a></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

            <br>

            <div id="new_campaign_form" v-if="type=='update'">

                <form>
            
                <div class="row">
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Campaign Name" aria-label="First name" id="new_campaign_name" name="name" disabled>
                    </div>
                    <div class="col">
                        <input type="number" class="form-control" placeholder="Budget" aria-label="First name" id="new_campaign_budget" v-model="campaign.budget">
                    </div>
                </div>
            
                <br>
            
                <div class="row">
                    <div class="col">
                    <select class="form-select" aria-label="Default select example" style="height: 50px;" id="new_campaign_category" v-model="campaign.category">
                        <option selected>Technology</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Travel">Travel</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Education">Education</option>
                        <option value="Food">Food</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select> 
                    </div>
                    <div class="col">
                        <select class="form-select" aria-label="Default select example" id="new_campaign_type" name="type" disabled>
                            <option selected>Private</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                </div>
            
                <br>
            
                <div class="row">
                    <div class="col" style="margin-left: 10px;">
                        <p>Start Date:</p>
                        <input type="date" class="form-control"  aria-label="First name" id="new_campaign_start_date" v-model="campaign.start_date">
                    </div>
                    <div class="col">
                        <p>End Date:</p>
                        <input type="date" class="form-control"  aria-label="First name" id="new_campaign_end_date" v-model="campaign.end_date">
                    </div>
                </div>
            
                <br>
            
                <div class="mb-3">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description" v-model="campaign.description"></textarea>
                </div>
                
                <button class="btn btn-primary" id="new_campaign_create" @click="update" >Update Campaign</button>
            
                </form>
            
            </div>
        </Sponsor_Base>
    `
}