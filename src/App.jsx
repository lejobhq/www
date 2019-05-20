import preact, { Component } from "preact";

import config from "./config";

import Landing from "./screens/Landing";
import Loading from "./screens/Loading";
import Dashboard from "./screens/Dashboard";
import Error from "./screens/Error";
import NotFound from "./screens/NotFound";

class App extends Component {
  constructor() {
    super();
    const jwt = localStorage.getItem("jwt");
    this.state = {
      route: "loading",
      jwt
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.handleSigninSuccess = this.handleSigninSuccess.bind(this);

    this.fetchInitialData = this.fetchInitialData.bind(this);
    this.parseHTTPResponse = this.parseHTTPResponse.bind(this);
  }

  componentDidMount() {
    this.initGoogle();
  }

  initGoogle() {
    if (!window.gapi.auth2) {
      window.gapi.load("auth2", () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2
            .init({
              client_id:
                "121730088331-2d78dlmj2h4u7i04smlgm8ub91hn1e9g.apps.googleusercontent.com"
            })
            .then(res => {
              if (res.isSignedIn.get()) {
                this.handleSigninSuccess(res.currentUser.get());
              } else {
                this.setState({ route: "landing" });
              }
            })
            .catch(err => console.error(err));
        }
      });
    }
  }

  fetchInitialData() {
    const { jwt } = this.state;
    fetch(`${config.api}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": jwt
      }
    })
      .then(this.parseHTTPResponse)
      .then(user => {
        this.setState({ user });
        fetch(`${config.api}/api/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": jwt
          }
        })
          .then(this.parseHTTPResponse)
          .then(jobs => this.setState({ jobs, route: "dashboard" }))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  parseHTTPResponse(res) {
    if (!res.ok) {
      localStorage.removeItem("jwt");

      if (res.status === 401) {
        this.setState({ route: "landing" });
      } else if (res.status === 404) {
        this.setState({ route: "not-found" });
      } else {
        this.setState({ route: "error" });
      }

      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    // All good!
    return res.json();
  }

  onSignIn(e) {
    e.preventDefault();
    if (!window.gapi.auth2) {
      return;
    }
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2
      .signIn()
      .then(
        googleUser => this.handleSigninSuccess(googleUser),
        err => console.error(err)
      );
  }

  onLogOut(e) {
    e.preventDefault();

    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(_ => {
        localStorage.removeItem("jwt");
        this.setState({ jwt: null, route: "landing" });
      })
      .catch(err => console.error(err));
  }

  handleSigninSuccess(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    fetch(`${config.api}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: id_token })
    })
      .then(this.parseHTTPResponse)
      .then(({ jwt }) => {
        localStorage.setItem("jwt", jwt);
        this.setState({ jwt }, this.fetchInitialData);
      })
      .catch(err => console.error(err));
  }

  render({}, { route, user, jobs }) {
    switch (route) {
      case "loading":
        return <Loading />;
      case "landing":
        return <Landing onSignIn={this.onSignIn} />;
      case "dashboard":
        return <Dashboard user={user} jobs={jobs} onLogOut={this.onLogOut} />;
      case "error":
        return <Error />;
      default:
        return <NotFound />;
    }
  }
}

export default App;
