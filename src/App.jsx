import preact, { Component } from "preact";

import config from "./config";

import Landing from "./screens/Landing";
import Loading from "./screens/Loading";
import Dashboard from "./screens/Dashboard";
import Error from "./screens/Error";
import NotFound from "./screens/NotFound";

import AddJob from "./screens/AddJob";
import EditJob from "./screens/EditJob";
import ShowJob from "./screens/ShowJob";
import OverlayLoading from "./screens/OverlayLoading";

import Overlay from "./layout/Overlay";

class App extends Component {
  constructor() {
    super();
    const jwt = localStorage.getItem("jwt");
    this.state = {
      route: "loading",
      overlay: false,
      jwt
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.handleSigninSuccess = this.handleSigninSuccess.bind(this);

    this.fetchInitialData = this.fetchInitialData.bind(this);
    this.parseHTTPResponse = this.parseHTTPResponse.bind(this);

    this.backToLanding = this.backToLanding.bind(this);

    this.onAddNewJobButton = this.onAddNewJobButton.bind(this);
    this.onDismissOverlay = this.onDismissOverlay.bind(this);
    this.onAddNewJob = this.onAddNewJob.bind(this);
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
            .catch(err => {
              console.error(err);
              this.setState({ route: "error" });
            });
        }
      });
    }
  }

  fetchInitialData() {
    const { jwt } = this.state;

    Promise.all([
      fetch(`${config.api}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": jwt
        }
      })
        .then(this.parseHTTPResponse)
        .then(({ data }) => {
          this.setState({ user: data });
        })
        .catch(err => {
          console.error(err);
          throw new Error(err);
        }),
      fetch(`${config.api}/api/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": jwt
        }
      })
        .then(this.parseHTTPResponse)
        .then(({ data }) => this.setState({ jobs: data.jobs }))
        .catch(err => {
          console.error(err);
          throw new Error(err);
        }),
      fetch(`${config.api}/api/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": jwt
        }
      })
        .then(this.parseHTTPResponse)
        .then(({ data }) => this.setState({ status: data.status }))
        .catch(err => {
          console.error(err);
          throw new Error(err);
        })
    ]).then(_ => this.setState({ route: "dashboard" }));
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
    this.setState({ route: "loading" });
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(
      googleUser => this.handleSigninSuccess(googleUser),
      err => {
        console.error(err);
        this.setState({ route: "error" });
      }
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
      .catch(err => {
        console.error(err);
        this.setState({ route: "error" });
      });
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
      .catch(err => {
        console.error(err);
        this.setState({ route: "error" });
      });
  }

  backToLanding() {
    this.setState({ route: "landing" });
  }

  onAddNewJobButton() {
    this.setState({ overlay: "add-job" });
  }

  onDismissOverlay() {
    this.setState({ overlay: false });
  }

  onAddNewJob({ url, notes }) {
    this.setState({ overlay: "loading" });
    const { jwt } = this.state;
    if (!jwt) {
      this.setState({ overlay: false, route: "error" });
      return;
    }

    fetch(`${config.api}/api/job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": jwt
      },
      body: JSON.stringify({ url, metadata: { notes } })
    })
      .then(this.parseHTTPResponse)
      .then(_ => {
        // TODO: Ideally, we'd just fetch the job's specific data, and not all the jobs again
        return fetch(`${config.api}/api/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": jwt
          }
        })
          .then(this.parseHTTPResponse)
          .then(({ data }) => this.setState({ jobs: data.jobs }))
          .catch(err => {
            console.error(err);
            throw new Error(err);
          });
      })
      .then(_ => this.setState({ overlay: false, route: "dashboard" }))
      .catch(err => {
        console.error(err);
        this.setState({ overlay: false, route: "error" });
      });
  }

  render({}, { route, overlay, user, jobs, status }) {
    let MainComp;
    switch (route) {
      case "loading":
        MainComp = () => <Loading />;
        break;
      case "landing":
        MainComp = () => <Landing onSignIn={this.onSignIn} />;
        break;
      case "dashboard":
        MainComp = () => (
          <Dashboard
            user={user}
            jobs={jobs}
            status={status}
            onLogOut={this.onLogOut}
            onAddNewJobButton={this.onAddNewJobButton}
          />
        );
        break;
      case "error":
        MainComp = () => <Error backToLanding={this.backToLanding} />;
        break;
      default:
        MainComp = () => <NotFound backToLanding={this.backToLanding} />;
    }

    let OverlayComp;
    switch (overlay) {
      case "add-job":
        OverlayComp = () => (
          <AddJob
            onDismissOverlay={this.onDismissOverlay}
            onAddNewJob={this.onAddNewJob}
          />
        );
        break;
      case "show-job":
        OverlayComp = () => <ShowJob />;
        break;
      case "edit-job":
        OverlayComp = () => <EditJob />;
        break;
      case "loading":
        OverlayComp = () => <OverlayLoading />;
        break;
      default:
        OverlayComp = null;
    }

    return (
      <div>
        <MainComp />
        {overlay && (
          <Overlay
            onDismissOverlay={this.onDismissOverlay}
            Comp={OverlayComp}
          />
        )}
      </div>
    );
  }
}

export default App;
