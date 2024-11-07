export default {
    data:function(){
        return {
            sponsors:[]
        }
    },
    mounted(){

        fetch('/sponsor_info',{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.sponsors = data
        })

    },
    methods:{
        approve:function(id){

            fetch('/admin_approval/' + id,{
                headers:{
                    'Authentication-Token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message=="ok"){
                    alert("Sponsor Approved Successfully");
                    this.$router.push('/admin/dash')
                }
            })
            
        }
    },
    template:`
        <div>

            <div id="header">
                <div id="icon">
                    <h2 id="icon_text">Admin</h2>
                </div>
                <div>
                    <router-link to="/admin/dash"><button id="flags">Go Back</button></router-link>
                    <a href="/"><button id="logout">Log Out</button></a>
                </div>
            </div>

            <div style="background-color: #ebf0f8; height:2000px; display: flex; flex-wrap: wrap; ">

                <div class="new_ad_card" v-for="sponsor in sponsors" v-if="sponsor.approval == 'False' " style="height:250px;margin: 30px;">

                            <h4 style="margin-top: 10px;margin-left: 20px;">Name :   <span style="color: #3874ff;">{{sponsor.name}}</span></h4>

                            <br>

                            <h6 style="margin-left: 20px;">Company: <span style="color: #5c6477;">{{sponsor.company}}</span></h6>

                            <br>

                            <h6 style="margin-left: 20px;">Budget: <span style="color: #5c6477;">{{sponsor.budget}}</span></h6>

                            <br>

                            <button id="new_ad_request_button" @click="approve(sponsor.id)" >Approve</button>
        
                </div>

            </div>

        </div>
    `
}