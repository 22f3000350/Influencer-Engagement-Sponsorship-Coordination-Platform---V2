import Home from './components/Home.js'
import Login from './components/Login.js'

const routes = [
    {path:'/', component: Home, name: 'Home'},
    {path:'/login/:type', component: Login, name: 'Login'}
]

const router = new VueRouter({
    routes
})

export default router

