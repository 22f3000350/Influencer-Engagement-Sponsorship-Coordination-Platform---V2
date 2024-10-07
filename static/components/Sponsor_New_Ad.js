import Sponsor_Base from "./Sponsor_Base.js";

export default {
    components:{
        Sponsor_Base:Sponsor_Base
    },
    template:`
        <Sponsor_Base new_ad="background-color: blueviolet; color: white;margin-top: 25px;" :sponsor_id="$route.params.sponsor_id">
            This is new ad
        </Sponsor_Base>
    `
}