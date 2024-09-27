export default {
    template:`
        <div id="home_body">
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                <a class="navbar-brand">Sponsorship Platform</a>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </nav>

            <div id="home_main">
                <h1 id="home_h1">Welcome to Influencer Engagement and Sponsorship Coordination Platform</h1>
                <br>
                <p>An Influencer Engagement and Sponsorship Coordination Platform streamlines collaboration between brands and influencers. It facilitates campaign management, tracks performance metrics, and ensures seamless communication.</p>
                <br>
                <br>
                <div id="home_buttons">
                <router-link to="/login/admin"><button class="home_button">Admin</button></router-link>
                <router-link to="/login/sponsor"><button class="home_button">Sponsor</button></router-link>
                <router-link to="/login/influencer"><button class="home_button">Influencer</button></router-link>
                </div>
            </div>

            <div id="home_image">
                <img src="static/images/landing_image.jpg" id="home_img" width="500px">
            </div>     
        </div>
    `
}