export default {
    data:function(){
        return {
            sponsors:[],
            influencers:[],
            campaigns:[],
            ads:[]
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


        fetch('http://127.0.0.1:5000/info/influencer',{
            headers:{
                'Authentication-Token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.influencers = data
        })


        fetch('http://127.0.0.1:5000/info/campaign/20000',{
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

        fetch('http://127.0.0.1:5000/ad/20000',{
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

            <div style="background-color: #ebf0f8;">

                <h1 style="margin-top: 50px;text-align: center;font-family:'Courier New', Courier, monospace;">Flagged</h1>
                <br>

                <div id="flag_content" style="width: 1000px;margin-left: 350px;">

                    <div class="card" v-for="sponsor in sponsors" v-if="sponsor.flag == 'True' ">
                        <div class="card-body">
                        <h2 style="margin-left: 30px;">{{sponsor.name}}  |  Sponsor</h2>
                        </div>
                    </div>
                    <br>

                    <div class="card" v-for="influencer in influencers" v-if="influencer.flag == 'True' ">
                        <div class="card-body">
                        <h2 style="margin-left: 30px;">{{influencer.name}}  |  Influencer</h2>
                        </div>
                    </div>
                    <br>

                    <div class="card" v-for="campaign in campaigns" v-if="campaign.flag == 'True' ">
                        <div class="card-body">
                        <h2 style="margin-left: 30px;">{{campaign.name}}  |  Campaign</h2>
                        </div>
                    </div>
                    <br>

                    <div class="card" v-for="ad in ads" v-if="ad.flag == 'True' ">
                        <div class="card-body">
                        <h2 style="margin-left: 30px;">{{ad.camp_name}}  |  Ad</h2>
                        </div>
                    </div>
                    <br>

                </div>

            </div>

        </div>
    `
}