export default {
    data: function(){
        return {
            type: this.$route.params.type,
            user:{
                email:'',
                password:'',
                role: this.$route.params.type
            },
            message:''
        }
    },
    methods:{
        login: function(){
            
            event.preventDefault(); 
            const form = this.$refs.myForm;

            if(form.checkValidity()){
                fetch('/user-login',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.user)
                })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    if(data.message === 'ok'){
                        localStorage.setItem('token', data.token)
                        if(data.role=="sponsor"){
                            this.$router.push({name:'Sponsor_Home',params:{'sponsor_id':data.id}})
                        }

                        if(data.role=="influencer"){
                            this.$router.push({name:'Influencer_Campaigns',params:{'influencer_id':data.id,'influencer_name':data.name}})
                        }

                        if(data.role=="admin"){
                            this.$router.push({name:'Admin_Dash'})
                        }
                    }
                    else{
                        this.message=data.message
                    }
                })
            }
            else{
                form.reportValidity();
            }         
        }
    },
    template:`
        <div>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                <a class="navbar-brand">Sponsorship Platform</a>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </nav>

            <div id="image_section">
                <img src="/static/images/login_image.jpg" id="login_img">
            </div>

            <div id="login_form">

                <div id="message" v-if="message != ''" style="margin-top: 35px;">
                    <p style="margin-top: 10px; font-size: 17px; color: red;">{{message}}</p>
                </div>

                <h1 align="center">Login</h1>

                <form ref="myForm">
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Email" v-model="user.email" required>
                    </div>
                    <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"></label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your Password" v-model="user.password" required>
                    </div>
                    <br>
                    <button id="login_btn" @click="login">Login</button>
                </form>
                <br><br>
                <div v-if="type === 'sponsor'">
                    <span id="span"><b>Don't have an account? </b><router-link to="/sponsor_register">Register Now</router-link></span>
                </div>
                <div v-if="type === 'influencer'">
                    <span id="span"><b>Don't have an account? </b><router-link to="/influencer_register">Register Now</router-link></span>
                </div>

            </div>

        </div>
    `
}