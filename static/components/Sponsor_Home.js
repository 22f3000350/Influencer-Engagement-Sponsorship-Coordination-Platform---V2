import sponsor_base from "./Sponsor_Base.js"

export default {
    components:{
        sponsor_base:sponsor_base
    },
    data:function(){
        return {
            id:"2"
        }
    },
    template:`
        <sponsor_base home="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">
            This is Home
        </sponsor_base>
    `
}