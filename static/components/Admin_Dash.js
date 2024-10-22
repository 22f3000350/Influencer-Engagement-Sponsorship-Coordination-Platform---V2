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

            <div id="influencer_table">

                <div id="home_campaign_content" style="margin: 20px;">

                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" style="text-align: center;">ID</th>
                            <th scope="col" style="text-align: center;">Influencer Name</th>
                            <th scope="col" style="text-align: center;">Category</th>
                            <th scope="col" style="text-align: center;">Followers</th>
                            <th scope="col" style="text-align: center;">Platform</th>
                            <th scope="col" style="text-align: center;">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="influencer in influencers">
                                <td><p style="margin-top: 15px;text-align: center;">{{influencer.id}}</p></td>
                                <td><p style="color:#3874FF; margin-top: 15px;text-align: center;">{{influencer.name}}</p></td>
                                <td><p style="margin-top: 15px;text-align: center;">{{influencer.category}}</p></td>
                                <td><p style="margin-top: 15px;text-align: center;">{{influencer.followers}}</p></td>
                                <td><p style="margin-top: 15px;text-align: center;">{{influencer.platform}}</p></td> 
                                <td v-if="influencer.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Flag</a></p></td>
                                <td v-if="influencer.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Unflag</a></p></td>
                            </tr>                   
                        </tbody>
                    </table>
            
                </div>    

    
            </div>

            <div id="campaign_table">

                <div id="home_campaign_content" style="margin: 20px;">

                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" style="text-align: center;">ID</th>
                            <th scope="col" style="text-align: center;">Campaign Name</th>
                            <th scope="col" style="text-align: center;">Category</th>
                            <th scope="col" style="text-align: center;">Visibility</th>
                            <th scope="col" style="text-align: center;">Action</th>
                        </tr>
                        </thead>
                        <tbody>                   
                            <tr v-for="campaign in campaigns">
                                <td><p style="margin-top: 15px;text-align: center;">{{campaign.id}}</p></td>
                                <td><p style="color:#3874FF; margin-top: 15px;text-align: center;">{{campaign.name}}</p></td>
                                <td><p style="margin-top: 15px;text-align: center;">{{campaign.category}}</p></td>
                                <td v-if="campaign.type=='Private'"><span style="background-color: rgba(253, 150, 150, 0.295);width: 80px;height: 25px; display: inline-block;border: 1px solid rgba(246, 51, 51, 0.519);border-radius: 5px;color: red;text-align: center;">{{campaign.type}}</span></td>
                                <td v-else><span style="background-color: rgba(132, 243, 145, 0.333);width: 80px;height: 25px; display: inline-block;border: 1px solid rgb(54, 238, 54);border-radius: 5px;color: green;text-align: center;">{{campaign.type}}</span></td>
                                <td v-if="campaign.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Flag</a></p></td>
                                <td v-if="campaign.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Unflag</a></p></td>
                            </tr>                                       
                        </tbody>
                    </table>
                
                    </div>   
            </div>

            <div id="ad_table">

                <div id="home_campaign_content" style="margin: 20px;">

                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" style="text-align: center;">ID</th>
                            <th scope="col" style="text-align: center;">Influencer Name</th>
                            <th scope="col" style="text-align: center;">Campaign Name</th>
                            <th scope="col" style="text-align: center;">Status</th>
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
                            <td style="text-align: center;"><p style="margin-top: 15px;">{{ad.payment_amount}}</p></td>
                            <td v-if="ad.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Flag</a></p></td>
                            <td v-if="ad.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;">Unflag</a></p></td>
                        </tr>
                        </tbody>
                    </table>
                
                    </div>    
            </div>



        </div>
    `
}