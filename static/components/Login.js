export default {
    data: function(){
        return {
            type: this.$route.params.type,
            user:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        login: function(){
            console.log(this.user.email);
            console.log(this.user.password);
            this.$router.push('/')
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

                <h1 align="center">Login</h1>

                <form>
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Email" v-model="user.email" required>
                    </div>
                    <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"></label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your Password" v-model="user.password" required>
                    </div>
                    <br>
                    <input type="submit" id="login_btn" value="Login" @click="login">
                </form>
                <br><br>
                <div v-if="type === 'sponsor'">
                    <span><b>Don't have an account? </b><router-link to="/sponsor_register">Register Now</router-link></span>
                </div>
                <div v-if="type === 'influencer'">
                    <span><b>Don't have an account? </b><router-link to="/influencer_register">Register Now</router-link></span>
                </div>

            </div>

        </div>
    `
}