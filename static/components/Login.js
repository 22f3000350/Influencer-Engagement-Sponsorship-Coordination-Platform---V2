export default {
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
                <img src="/static/images/login_image.jpg" id="img">
            </div>

            <div id="login_form">

                <h1 align="center">Login</h1>

                <form method="post">
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"></label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Username" name="username" required>
                    </div>
                    <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"></label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your Password" name="password" required>
                    </div>
                    <br>
                    <input type="submit" id="login_btn" value="Login">
                </form>

            </div>

        </div>
    `
}