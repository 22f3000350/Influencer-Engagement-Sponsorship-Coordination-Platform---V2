import Home from './components/Home.js'
import Login from './components/Login.js'
import Sponsor_Register from './components/Sponsor_Register.js'
import Influencer_Register from './components/Influencer_Register.js'
import Sponsor_Home from './components/Sponsor_Home.js'
import Sponsor_Requests from './components/Sponsor_Requests.js'
import Sponsor_New_Ad from './components/Sponsor_New_Ad.js'
import Sponsor_Update_Ad from './components/Sponsor_Update_Ad.js'
import Sponsor_Delete_Ad from './components/Sponsor_Delete_Ad.js'
import Sponsor_New_Campaign from './components/Sponsor_New_Campaign.js'
import Sponsor_Update_Campaign from './components/Sponsor_Update_Campaign.js'
import Sponsor_Delete_Campaign from './components/Sponsor_Delete_Campaign.js'
import Influencer_Campaigns from './components/Influencer_Campaigns.js'
import Influencer_Requests from './components/Influencer_Requests.js'
import Influencer_Status from './components/Influencer_Status.js'
import Influencer_Edit from './components/Influencer_Edit.js'
import Admin_Dash from './components/Admin_Dash.js'

const routes = [
    {path:'/', component: Home, name: 'Home'},
    {path:'/login/:type', component: Login, name: 'Login'},
    {path:'/sponsor_register', component: Sponsor_Register, name: 'Sponsor_Register'},
    {path:'/influencer_register', component: Influencer_Register, name: 'Influencer_Register'},
    {path:'/sponsor/home/:sponsor_id', component: Sponsor_Home, name: 'Sponsor_Home'},
    {path:'/sponsor/requests/:sponsor_id', component: Sponsor_Requests, name: 'Sponsor_Requests'},
    {path:'/sponsor/new_ad/:sponsor_id', component: Sponsor_New_Ad, name: 'Sponsor_New_Ad'},
    {path:'/sponsor/update_ad/:sponsor_id', component: Sponsor_Update_Ad, name: 'Sponsor_Update_Ad'},
    {path:'/sponsor/delete_ad/:sponsor_id', component: Sponsor_Delete_Ad, name: 'Sponsor_Delete_Ad'},
    {path:'/sponsor/new_campaign/:sponsor_id', component: Sponsor_New_Campaign, name: 'Sponsor_New_Campaign'},
    {path:'/sponsor/update_campaign/:sponsor_id', component: Sponsor_Update_Campaign, name: 'Sponsor_Update_Campaign'},
    {path:'/sponsor/delete_campaign/:sponsor_id', component: Sponsor_Delete_Campaign, name: 'Sponsor_Delete_Campaign'},
    {path:'/influencer/campaigns/:influencer_id/:influencer_name', component: Influencer_Campaigns, name: 'Influencer_Campaigns'},
    {path:'/influencer/requests/:influencer_id/:influencer_name', component: Influencer_Requests, name: 'Influencer_Requests'},
    {path:'/influencer/status/:influencer_id/:influencer_name', component: Influencer_Status, name: 'Influencer_Status'},
    {path:'/influencer/edit/:influencer_id/:influencer_name', component: Influencer_Edit, name: 'Influencer_Edit'},
    {path:'/admin/dash', component: Admin_Dash, name: 'Admin_Dash'}
    
]

const router = new VueRouter({
    routes
})

export default router

