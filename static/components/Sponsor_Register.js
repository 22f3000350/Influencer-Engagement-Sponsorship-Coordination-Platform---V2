export default {
    data: function(){
        return {
            sponsor:{
                email:'',
                username:'',
                password:'',
                company:'',
                contact_info:'',
                budget:''
            },
            message:''
        }
    },
    methods:{
        register: function(){

            event.preventDefault(); 
            const form = this.$refs.myForm;

            if(form.checkValidity()){
                fetch('/sponsor_register',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.sponsor)
                })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    if(data.message === 'ok'){
                        this.$router.push('/login/sponsor')
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

                 <div id="message" v-if="message != ''" style="margin-top: 35px;">
                    <p style="margin-top: 10px; font-size: 17px; color: red;">{{message}}</p>
                </div>

                <h1 align="center">Register</h1>

                <br>

                <form ref="myForm">
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter your Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="sponsor.email" required>
                    </div>
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter your Username</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="sponsor.username" required>
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
                    <button id="login_btn" @click="register">Register</button>
                </form>
                <br><br>
                <span id="span"><b>Already have an account? </b><router-link to="/login/sponsor">Login Now</router-link></span>
            </div>

            </div>

        </div>
    
    `
}