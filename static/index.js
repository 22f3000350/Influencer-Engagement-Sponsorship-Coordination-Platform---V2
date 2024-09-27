import router  from "./router.js"

const vue = new Vue({
    el:"#app",
    template:`
        <router-view></router-view>
    `,
    router:router,
    data:{
        message:'Vue is Working'
    }
})