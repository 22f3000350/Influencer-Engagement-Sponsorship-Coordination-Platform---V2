export default {
    props:['home','requests','new_ad','update_ad','delete_ad','new_campaign','update_campaign','delete_campaign'],
    template:`
        <div>
             <div id="header">
                <div id="icon">
                    <h1 id="icon_text">Sponsor</h1>
                </div>
                <router-link to="/"><button id="logout">Log Out</button></router-link>
            </div>
            <div id="sidebar">
                <router-link to="/sponsor/home/1"><button class="button" :style="home" >Home</button></router-link>

                <p class="side_heading">Manage Ads</p>

                <router-link to="/sponsor/requests/1"><button class="button" :style="requests" >Requests</button></router-link>
                <br>
                <router-link to="/sponsor/new_ad/1"><button class="button" :style="new_ad" >New Ad</button></router-link>
                <br>
                <router-link to="/sponsor/update_ad/1"><button class="button" :style="update_ad" >Update Ad</button></router-link>
                <br>
                <router-link to="/sponsor/delete_ad/1"><button class="button" :style="delete_ad" >Delete Ad</button></router-link>

                <p class="side_heading">Manage Campaigns</p>

                <router-link to="/sponsor/new_campaign/1"><button class="button" :style="new_campaign" >New Campaign</button></router-link>
                <br>
                <router-link to="/sponsor/update_campaign/1"><button class="button" :style="update_campaign" >Update Campaign</button></router-link>
                <br>
                <router-link to="/sponsor/delete_campaign/1"><button class="button" :style="delete_campaign" >Delete Campaign</button></router-link>
                
            </div>
            
            <div id="main">
                <slot></slot>
            </div>

        </div>
    `
}