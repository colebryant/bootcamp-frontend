import eventListeners from "./eventListeners"
const dashboard = {
  buildLoginForm(){
    //using string interpolation to create the form
    let formHTML = `
    <h1 class = "t-border">Nomads</h1>
      <section class = "form">
        <form action="" class = registerForm>
          <input id = "regUserName" type="text" placeholder = "Username" required>
          <input id = "regEmail" type="email" placeholder = "Email" required>
          <input id = "regPassword" type="password" placeholder = "Password" required>
          <input id = "regConfirmPassword" type="password" placeholder = "Confirm Password" required>
          <button id = "registerButton">Create Account</button>
          <p class = "message">Already a Registered Member? <a href = "#">LogIn</a></p>
        </form>
        <form class = "login-form">
          <input id = "userNameVal" type="text" placeholder = "Username">
          <input id = "passwordVal" type="password" placeholder = "Password">
          <button type = "button" id = "logIn">Login</button>
          <button id = "modalButton">About</button>
          <p class = "message">Don't have an account? <a href = "#">Register</a></p>
        </form>
      </section>
      <section id="nomadModal" class="modal">
      <!-- Modal content -->
        <section class="modal-content">
          <section class="modal-header">
            <span class="close">&times;</span>
            <h2>About Nomads</h2>
          </section>
          <section class="modal-body">
            <h3>The developers behind Nomads</h3>
            <img id = "creatorsImage" src = "images/nomadCreators.jpg" alt = "application creators">
            <p>Nomads is a front-end social media app with a theme centered around van life travelers. Users can peruse articles, check out upcoming events, organize their tasks, message other users and add friends. Our group built this app as part of a practice sprint at Nashville Software School.</p>
          </section>
          <section class="modal-footer">
            <h3>Created By: Jordan Rosas, Justin Wheeler, Cole Bryant, Joseph Baugh and Russell Reiter</h3>
          </section>
        </section>
      </section>
      `
      $("#output").html(formHTML)
      eventListeners.modalDisplayAnimation()
      $("#logIn").click(eventListeners.userLogin)
      // $("#logIn").click(eventListeners.tasksNavLink)
      $("#registerButton").click(eventListeners.userRegistration)
      $("#registerButton").click(this.buildLoginForm)
      // $("#registerButton").click(eventListeners.userLogin)

    },
  createNavBar(){
    let navHTML = `
      <nav>
        <ul>
          <li id = "newsLink"><a class = "active" href = "#">Articles</a></li>
          <li id = "eventLink"><a href = "#">Events</a></li>
          <li id = "tasksLink"><a href = "#">Tasks</a></li>
          <li id = "friendsLink"><a href = "#">Friends</a></li>
          <li id = "messagesLink"><a href = "#">Messages</a></li>
          <li class = "signOut" id = "logo" ><a href="#">Sign Out</a></li>
        </ul>
      </nav>
    `
    let navBarContainer = document.querySelector("#main-nav")
    navBarContainer.innerHTML = navHTML

    /*Navigation link event listeners*/
    $("#messagesLink").click(eventListeners.messagesNavLink)
    $("#eventLink").click(eventListeners.eventsNavLink)
    $("#friendsLink").click(eventListeners.friendsNavLink)
    $("#tasksLink").click(eventListeners.tasksNavLink)
    $("#newsLink").click(eventListeners.newsNavLink)

    /*after signout is clicked session storage is cleared and the logIn/register form is presented from here
    another user can log in and session storage will kick off for the new logged in user*/
    $(".signOut").click(eventListeners.nomadNavLink)
    }
}
export default dashboard