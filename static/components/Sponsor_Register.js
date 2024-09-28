export default {
    data: function(){
        return {
            sponsor:{
                email:'',
                password:'',
                company:'',
                contact_info:'',
                budget:''
            }
        }
    },
    methods:{
        register: function(){
            console.log(this.sponsor)
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

                <form>
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter your Username</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="sponsor.email" required>
                    </div>
                    <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Enter your Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="sponsor.password" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter your Company</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="sponsor.company" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter your Contact Info</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="sponsor.contact_info" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter your Budget</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="sponsor.budget" required>
                    </div>
                    <br>
                    <input type="submit" id="login_btn" value="Register" @click="register">
                </form>
                <br><br>
                <span><b>Already have an account? </b><router-link to="/login/sponsor">Login Now</router-link></span>
            </div>

            </div>

        </div>
    
    `
}