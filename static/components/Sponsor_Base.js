export default {
    props:['sponsor_id','home','requests','new_ad','update_ad','delete_ad','new_campaign','update_campaign','delete_campaign'],
    methods:{
        export_csv:function(){
            fetch('http://127.0.0.1:5000/export_csv/'+this.sponsor_id,{
                headers:{
                    'Authentication-Token': localStorage.getItem('token')
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();  
            })
            .then(blob => {
              
                const url = window.URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `sponsor_${this.sponsor_id}_report.csv`; 
                document.body.appendChild(a);
                a.click();  
                a.remove();  
                
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('There was a problem with the download:', error);
                alert('Failed to download file');
            });
        }
    },
    template:`
        <div>
             <div id="sponsor_header">
                <div id="icon">
                    <h1 id="icon_text">Sponsor</h1>
                </div>
                <div style="margin-left:75px;">
                    <button id="logout" style="margin-right:25px;" @click="export_csv">Export CSV</button>
                    <router-link to="/"><button id="logout">Log Out</button></router-link>
                </div>
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