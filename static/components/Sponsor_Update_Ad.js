import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    data:function(){
        return {
            id: this.$route.params.sponsor_id,
            ad_id:'',
            camp_name:'',
            ads: [],
            type:'view',
            ad:{
                payment_amount:'',
                requirements:''
            }
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
        change:function(a_id,c_name){
            this.type='update';
            this.ad_id=a_id;
            this.camp_name=c_name;
        },
        update:function(){


            fetch('http://127.0.0.1:5000/ad/'+ this.id +'/'+ this.ad_id,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.ad)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message=="ok"){
                    alert("Ad Updated Successfully");
                    this.ad.payment_amount='';
                    this.ad.requirements='';                 
                }
            })

            this.ad_id='';
            this.camp_name='';
            this.type='view';
        }
    },
    template:`
        <Sponsor_Base update_ad="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">

            <h1 id="update_campaign_heading">Update Ad</h1>

            <h2 align="center" v-if="ads.length == 0" >No ad is available</h2>

             <div id="update_campaign_table" v-if="type == 'view' && ads.length>0">

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
                            <td style="text-align: center;"><a style="margin-top: 15px; text-decoration: none;" href="" @click.prevent="change(ad.id,ad.camp_name)">Update</a></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
            </div>

            <br>

            <div id="new_ad_form" v-if="type=='update'" >

                <form>
        
                <div class="row">
                    <div class="col">
                        <select class="form-select" aria-label="Default select example" style="height: 50px;width: 400px;" name="camp_name" disabled>
                            <option value="name">{{camp_name}}</option>
                        </select>
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Payment Amount" aria-label="Last name" style="height: 50px;width: 220px;" v-model="ad.payment_amount">
                    </div>
                </div>
        
                <br>
        
                <div class="mb-3">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Requirements" v-model="ad.requirements"></textarea>
                </div>
        
                <br>
        
                <button class="btn btn-primary" style="width: 200px;height: 50px;margin-left: 20px;" @click="update">Update Ad</button>
        
                </form>
        
            </div>

        </Sponsor_Base>
    `
}