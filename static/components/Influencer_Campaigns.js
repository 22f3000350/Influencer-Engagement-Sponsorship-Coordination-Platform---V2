import Influencer_Base from "./Influencer_Base.js"

export default {
    components:{
        Influencer_Base:Influencer_Base
    },
    template:`
        <Influencer_Base campaigns="background-color: blueviolet; color: white;" :influencer_id="$route.params.influencer_id" :name="$route.params.influencer_name">
            This is campaigns
        </Influencer_Base>
    `
}