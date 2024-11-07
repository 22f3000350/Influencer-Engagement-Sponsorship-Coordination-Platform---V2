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
        .then(() => {

            const ad_data_count = this.ads.reduce((acc, obj) => {
                acc[obj.status] = (acc[obj.status] || 0) + 1;
                return acc;
            }, {});

            const ctx1 = document.getElementById('Chart_1');
            const data0 = {
              labels: ['Accepted','Pending','Rejected'],
              datasets: [{
                label: 'Status of Ads',
                data: [ad_data_count['Accepted'],ad_data_count['Pending'],ad_data_count['Rejected']],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 99, 132, 0.5)'
                ],
                borderColor: [
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 99, 132)'
                ],
                borderWidth: 1
              }]
            };

            const config0 = {
                type: 'bar',
                data: data0,
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                },
              };

            new Chart(ctx1,config0)

            const campaign_data_count = this.campaigns.reduce((acc, obj) => {
                acc[obj.type] = (acc[obj.type] || 0) + 1;
                return acc;
            }, {});

            const ctx2 = document.getElementById('Chart_2');

            const data = {
                labels: [
                    'Private',
                    'Public'
                ],
                datasets: [{
                    label: 'Type of Campaign',
                    data: [campaign_data_count['Private'],campaign_data_count['Public']],
                    backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
                };

                const config = {
                type: 'doughnut',
                data: data,
                };

            new Chart(ctx2,config)

            const campaign_data_sum = this.campaigns.reduce((acc, obj) => {
                acc[obj.type] = (acc[obj.type] || 0) + obj.budget;
                return acc;
            }, {});

            const ctx3 = document.getElementById('Chart_3');

            const data1 = {
                labels: [
                    'Private Budget',
                    'Public Budget',
                ],
                datasets: [{
                    label: 'Campaign Type Budget',
                    data: [campaign_data_sum['Private'],campaign_data_sum['Public']],
                    backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
                };

                const config1 = {
                    type: 'pie',
                    data: data1,
                    };

            new Chart(ctx3,config1)

            const ad_data_sum = this.ads.reduce((acc, obj) => {
                acc[obj.status] = (acc[obj.status] || 0) + obj.payment_amount;
                return acc;
            }, {});

            const ctx4 = document.getElementById('Chart_4');

            const data4 = {
                labels: ['Accepted','Pending','Rejected'],
                datasets: [{
                  label: 'Payment Amount of Ads',
                  data: [ad_data_sum['Accepted'],ad_data_sum['Pending'],ad_data_sum['Rejected']],
                  backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)'
                  ],
                  borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)'
                  ],
                  borderWidth: 1
                }]
              };

              const config2 = {
                  type: 'bar',
                  data: data4,
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  },
                };

            new Chart(ctx4,config2)
              
        })

    },
    methods:{
        flag:function(type,id){

            fetch('/admin_flag/' + type + '/' + id,{
                headers:{
                    'Authentication-Token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.message=="ok"){
                    alert("Flagged or Unflagged Successfully");
                    this.$router.push('/admin/flag')
                }
            })
            
        }
    },
    template:`
        <div style="background-color: #ebf0f8;">
            <div id="admin_header">
                <div id="icon">
                    <h2 id="icon_text">Admin</h2>
                </div>
                <div>
                    <router-link to="/admin/approval"><button id="flags">Approval</button></router-link>
                    <router-link to="/admin/flag"><button id="flags">Flags</button></router-link>
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

            <div id="admin_sponsor_table">

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
                                <td v-if="sponsor.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;" @click.prevent="flag('sponsor',sponsor.id)">Flag</a></p></td>
                                <td v-if="sponsor.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;" @click.prevent="flag('sponsor',sponsor.id)">Unflag</a></p></td>
                            </tr>   
                        </tbody>
                    </table>
                
                    </div>    
            </div>

            <div id="admin_influencer_table">

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
                                <td v-if="influencer.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;"  @click.prevent="flag('influencer',influencer.id)">Flag</a></p></td>
                                <td v-if="influencer.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;"  @click.prevent="flag('influencer',influencer.id)">Unflag</a></p></td>
                            </tr>                   
                        </tbody>
                    </table>
            
                </div>    

    
            </div>

            <div id="admin_campaign_table">

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
                                <td v-if="campaign.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;"  @click.prevent="flag('campaign',campaign.id)">Flag</a></p></td>
                                <td v-if="campaign.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;"  @click.prevent="flag('campaign',campaign.id)">Unflag</a></p></td>
                            </tr>                                       
                        </tbody>
                    </table>
                
                    </div>   
            </div>

            <div id="admin_ad_table">

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
                            <td v-if="ad.flag=='False'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;"  @click.prevent="flag('ad',ad.id)">Flag</a></p></td>
                            <td v-if="ad.flag=='True'"><p style="margin-top: 15px;text-align: center;"><a href="" style="color: red;text-decoration: none;"  @click.prevent="flag('ad',ad.id)">Unflag</a></p></td>
                        </tr>
                        </tbody>
                    </table>
                
                    </div>    
            </div>

            <div id="graph">
            
                <div class="graph">
                    <canvas id="Chart_1" style="margin-top: 20px;height: 300px;"></canvas>
                </div>

                <div class="graph">
                    <canvas id="Chart_2" style="margin-left: 50px;"></canvas>
                </div>

                 <div class="graph">
                    <canvas id="Chart_3" style="margin-left: 50px;"></canvas>
                </div>

                <div class="graph">
                    <canvas id="Chart_4" style="margin-top: 30px;"></canvas>
                </div>
            
            
            
            </div>

        </div>
    `
}