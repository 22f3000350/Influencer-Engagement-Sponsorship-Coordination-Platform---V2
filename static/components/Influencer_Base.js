export default {
    props:['influencer_id','name','campaigns','requests','status','edit'],
    template:`
        <div style="background-color:#ebf0f8;">
            <div id="influencer_header">
                <h2 id="title">Influencer</h2>
                <img src="./static/images/influencer_header.jpg" id="img_header" >
                <h2 id="heading">Influencers Driving Trends and Shaping Consumer Choices</h2>
                <p id="desc">Influencers leverage social media platforms to impact followers' opinions and behaviors, often through sponsored content. They range from celebrities to niche experts, driving trends and brand awareness across various industries.</p>
                <a href="/"><button type="submit" id="logout_btn">Log out</button></a>
            </div>
            <div id="influencer_main">
               <slot></slot>
            </div>

            <div id="sidebar">
                <div id="profile">
                    <img src="./static/images/profile image.jpg" id="img_profile" >
                    <br>
                    <h4 style="text-align: center;">{{name}}</h4>
                    <router-link :to="'/influencer/edit/'+influencer_id+'/'+name" style="margin-left: 90px;text-decoration: none;">Edit Profile</router-link> 
                </div>
                <br>
                <div id="buttons">
                    <router-link :to="'/influencer/campaigns/'+influencer_id+'/'+name"><button class="button" :style="campaigns">Campaigns</button></router-link>
                    <router-link :to="'/influencer/requests/'+influencer_id+'/'+name"><button class="button" :style="requests">Requests</button></router-link>
                    <router-link :to="'/influencer/status/'+influencer_id+'/'+name"><button class="button" :style="status">Status</button></router-link>
                </div>
            </div>
        </div>
    `
}