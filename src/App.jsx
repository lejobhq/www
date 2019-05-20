import preact, { Component } from "preact";

import config from "./config";

import Landing from "./screens/Landing";
import Loading from "./screens/Loading";
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
  }

  componentDidMount() {
    const { jwt } = this.state;

    const parseHTTPResponse = res => {
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
    };

    fetch(`${config.api}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": jwt
      }
    })
      .then(parseHTTPResponse)
      .then(user => {
        this.setState({ user });
        fetch(`${config.api}/api/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": jwt
          }
        })
          .then(parseHTTPResponse)
          .then(jobs => this.setState({ jobs, route: "dashboard" }))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render({}, { route }) {
    switch (route) {
      case "loading":
        return <Loading />;
      case "landing":
        return <Landing />;
      case "error":
        return <Error />;
      default:
        return <NotFound />;
    }
  }
}

export default App;
