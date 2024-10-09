import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    data:function(){
        return {
            id: this.$route.params.sponsor_id,
            campaign: {
                name:'',
                budget:'',
                category:'',
                type:'',
                start_date:'',
                end_date:'',
                description:''

            }
        }
    },
    methods:{
        create:function(){
            event.preventDefault(); 
            const form = this.$refs.myForm;

            if(form.checkValidity()){
                fetch('http://127.0.0.1:5000/campaign/'+ this.id,{
                    method:'POST',
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
                        alert("Campaign Created Successfully");
                        this.campaign.name='';
                        this.campaign.budget='';
                        this.campaign.category='';
                        this.campaign.type='';
                        this.campaign.start_date='';
                        this.campaign.end_date='';
                        this.campaign.description='';
                    }
                })
                .catch((err) => {
                    alert("Campaign name already exists");
                    this.campaign.name='';

                })
            }
            else{
                form.reportValidity();
            }  
        }
    },
    template:`
        <Sponsor_Base new_campaign="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">

            <h1 id="new_campaign_heading">Create New Campaign</h1>

                <br>

                <div id="new_campaign_form">

                    <form ref="myForm">

                    <div class="row">
                        <div class="col">
                        <input type="text" class="form-control" placeholder="Campaign Name" aria-label="First name" id="new_campaign_name" v-model="campaign.name" required>
                        </div>
                        <div class="col">
                            <input type="number" class="form-control" placeholder="Budget" aria-label="First name" id="new_campaign_budget" v-model="campaign.budget" required>
                        </div>
                    </div>

                    <br>

                    <div class="row">
                        <div class="col">
                        <select class="form-select" aria-label="Default select example" style="height: 50px;" id="new_campaign_category" v-model="campaign.category" required>
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
                            <select class="form-select" aria-label="Default select example" id="new_campaign_type" v-model="campaign.type" required>
                                <option selected>Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>
                    </div>

                    <br>

                    <div class="row">
                        <div class="col" style="margin-left: 10px;">
                            <p>Start Date:</p>
                            <input type="date" class="form-control"  aria-label="First name" id="new_campaign_start_date" v-model="campaign.start_date" required>
                        </div>
                        <div class="col">
                            <p>End Date:</p>
                            <input type="date" class="form-control"  aria-label="First name" id="new_campaign_end_date" v-model="campaign.end_date" required>
                        </div>
                    </div>

                    <br>

                    <div class="mb-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description" v-model="campaign.description" required></textarea>
                    </div>
                    
                    <button class="btn btn-primary" id="new_campaign_create" @click="create">Create Campaign</button>

                    </form>
                </div>
        </Sponsor_Base>
    `
}