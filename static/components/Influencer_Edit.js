import Influencer_Base from "./Influencer_Base.js"

export default {
    components:{
        Influencer_Base:Influencer_Base
    },
    data:function(){
        return {
            influencer:{
                category:'',
                niche:'',
                platform:'',
                followers:''
            }
        }
    },
    methods:{
        edit:function(){
            fetch('http://127.0.0.1:5000/influencer/edit/'+ this.$route.params.influencer_id,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.influencer)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message=="ok"){
                    alert("Influencer Details Updated Successfully");
                    this.influencer.category='';
                    this.influencer.niche='';
                    this.influencer.platform='';
                    this.influencer.followers='';
                    
                }
            })
        }
    },
    template:`
        <Influencer_Base edit="background-color: blueviolet; color: white;" :influencer_id="$route.params.influencer_id" :name="$route.params.influencer_name">
            <div id="edit_box">
            <h2 style="text-align: center;">Update Profile</h2>
            <br>
            <form>
                <div>
                    <select class="form-select" aria-label="Default select example" style="height: 50px;" v-model="influencer.category">
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
                <br>
                <div class="mb-3">
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style="height: 50px;" placeholder="Enter your Niche" v-model="influencer.niche">
                    <br>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style="height: 50px;" placeholder="Enter your Platform" v-model="influencer.platform">
                    <br>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style="height: 50px;" placeholder="Enter your Followers" v-model="influencer.followers">
                    <br>
                    <button class="btn btn-primary" style="width: 500px;height: 50px;" @click="edit">Update</button>
                </div>
            </form>
            
        </div>

        </Influencer_Base>
    `
}