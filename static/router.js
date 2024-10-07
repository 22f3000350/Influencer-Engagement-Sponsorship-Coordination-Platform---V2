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
    {path:'/sponsor/delete_campaign/:sponsor_id', component: Sponsor_Delete_Campaign, name: 'Sponsor_Delete_Campaign'}
    
]

const router = new VueRouter({
    routes
})

export default router

