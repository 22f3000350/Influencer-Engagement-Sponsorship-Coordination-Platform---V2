export default {
    props:['sponsor_id','home','requests','new_ad','update_ad','delete_ad','new_campaign','update_campaign','delete_campaign'],
    methods:{
        export:function(){
            fetch('http://127.0.0.1:5000/campaign/'+this.sponsor_id,{
                headers:{
                    'Authentication-Token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message  == "ok"){
                    alert("Exported the CSV Successfully")
                }
            })
        }
    },
    template:`
        <div>
             <div id="sponsor_header">
                <div id="icon">
                    <h1 id="icon_text">Sponsor</h1>
                </div>
                <button id="logout" style="margin-right:25px;">Export CSV</button>
                <router-link to="/"><button id="logout">Log Out</button></router-link>
            </div>
            <div id="sponsor_sidebar">
                <router-link :to="'/sponsor/home/'+sponsor_id"><button class="button" :style="home" >Home</button></router-link>

                <p class="side_heading">Manage Ads</p>

                <router-link :to="'/sponsor/requests/'+sponsor_id"><button class="button" :style="requests" >Requests</button></router-link>
                <br>
                <router-link :to="'/sponsor/new_ad/'+sponsor_id"><button class="button" :style="new_ad" >New Ad</button></router-link>
                <br>
                <router-link :to="'/sponsor/update_ad/'+sponsor_id"><button class="button" :style="update_ad" >Update Ad</button></router-link>
                <br>
                <router-link :to="'/sponsor/delete_ad/'+sponsor_id"><button class="button" :style="delete_ad" >Delete Ad</button></router-link>

                <p class="side_heading">Manage Campaigns</p>

                <router-link :to="'/sponsor/new_campaign/'+sponsor_id"><button class="button" :style="new_campaign" >New Campaign</button></router-link>
                <br>
                <router-link :to="'/sponsor/update_campaign/'+sponsor_id"><button class="button" :style="update_campaign" >Update Campaign</button></router-link>
                <br>
                <router-link :to="'/sponsor/delete_campaign/'+sponsor_id"><button class="button" :style="delete_campaign" >Delete Campaign</button></router-link>
                
            </div>
            
            <div id="sponsor_main">
                <slot></slot>
            </div>

        </div>
    `
}