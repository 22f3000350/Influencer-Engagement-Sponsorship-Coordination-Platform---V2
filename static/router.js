import Home from './components/Home.js'
import Login from './components/Login.js'
import Sponsor_Register from './components/Sponsor_Register.js'
import Influencer_Register from './components/Influencer_Register.js'

const routes = [
    {path:'/', component: Home, name: 'Home'},
    {path:'/login/:type', component: Login, name: 'Login'},
    {path:'/sponsor_register', component: Sponsor_Register, name: 'Sponsor_Register'},
    {path:'/influencer_register', component: Influencer_Register, name: 'Influencer_Register'}
]

const router = new VueRouter({
    routes
})

export default router

