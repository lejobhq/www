import preact, { Component } from "preact";

import config from "./config";

import Landing from "./screens/Landing";
import Loading from "./screens/Loading";

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
        if (res.status === 401) {
          localStorage.removeItem("jwt");
          this.setState({ route: "landing" });
        }
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
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
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render({}, { route }) {
    switch (route) {
      case "loading":
        return <Loading />;
      case "landing":
        return <Landing />;
      default:
        return <div>Hello, world!</div>;
    }
  }
}

export default App;
