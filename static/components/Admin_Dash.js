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
    },
    template:`
        <div style="background-color: #ebf0f8;">
            <div id="admin_header">
                <div id="icon">
                    <h2 id="icon_text">Admin</h2>
                </div>
                <div>
                    <a href=""><button id="flags">Flags</button></a>
                    <a href="/"><button id="logout">Log Out</button></a>
                </div>
            </div>

            <h1 style="font-size: 57px;margin-left: 30px;margin-top: 30px;font-weight: 800;color: #141824;font-family: sans-serif;">Dashboard</h1>

            <div id="num_stat">
                <div class="box">
                    <h1 style="font-size: 110px;text-align: center;">{{sponsors.length}}</h1>
                    <h5 style="text-align: center;">Number of Sponsors</h5> 
                </div>
                <div class="box">
                    <h1 style="font-size: 110px;text-align: center;">{{influencers.length}}</h1>
                    <h5 style="text-align: center;">Number of Influencers</h5>
                </div>
                <div class="box">
                    <h1 style="font-size: 110px;text-align: center;">{{campaigns.length}}</h1>
                    <h5 style="text-align: center;">Number of Campaigns</h5>
                </div>
                <div class="box">
                    <h1 style="font-size: 110px;text-align: center;">{{ads.length}}</h1>
                    <h5 style="text-align: center;">Number of Ads</h5>
                </div>
            </div>

            <div id="sponsor_table">

                <div id="home_campaign_content" style="margin: 20px;">

                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" style="text-align: center;">ID</th>
                            <th scope="col" style="text-align: center;">Sponsor Name</th>
                            <th scope="col" style="text-align: center;">Company</th>
                            <th scope="col" style="text-align: center;">Budget</th>
                            <th scope="col" style="text-align: center;">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sponsor in sponsors">
                                <td><p style="margin-top: 15px;text-align: center;">{{sponsor.id}}</p></td>
                                <td><p style="color:#3874FF; margin-top: 15px;text-align: center;">{{sponsor.name}}</p></td>
                                <td><p style="margin-top: 15px;text-align: center;">{{sponsor.company}}</p></td>
                                <td><p style="margin-top: 15px;text-align: center;">{{sponsor.budget}}</p></td>  
                                <td v-if="sponsor.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Flag</a></p></td>
                                <td v-if="sponsor.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Unflag</a></p></td>
                            </tr>   
                        </tbody>
                    </table>
                
                    </div>    
            </div>


        </div>
    `
}