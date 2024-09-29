export default {
    data: function(){
        return {
            influencer:{
                email:'',
                username:'',
                password:'',
                category:'',
                niche:'',
                platform:'',
                followers:''
            }
        }
    },
    methods:{
        register: function(){
            console.log(this.influencer)
            this.$router.push('/')
        }
    },
    template:`
        <div id="body">
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

            <div id="register_form">

                <h1 align="center">Register</h1>

                <br>

                <form @submit="register">
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter your Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="influencer.email" required>
                    </div>
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter your Username</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="influencer.username" required>
                    </div>
                    <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Enter your Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="influencer.password" required>
                    </div>
                    <div class="mb-3">
                    <label for="form-select" class="form-label">Enter your Category</label>
                    <select class="form-select" aria-label="Default select example" style="height: 50px;width: 450px;margin-left: 30px;" v-model="influencer.category" required>
                        <option selected>Technology</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Travel">Travel</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Education">Education</option>
                        <option value="Food">Food</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>            
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter your Niche</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="influencer.niche" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter number of Platform</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="influencer.platform" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter number of Followers</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="influencer.followers" required>
                    </div>
                    <br>
                    <input type="submit" id="login_btn" value="Register">
                </form>
                <br>
                <span><b>Already have an account? </b><router-link to="/login/influencer">Login Now</router-link></span>
            </div>

        </div>
    `
}