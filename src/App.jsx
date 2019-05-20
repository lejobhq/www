import preact, { Component } from 'preact';

import Landing from './screens/Landing';

class App extends Component {
  constructor() {
    super()
    this.state = {
      route: "landing"
    }
  }

  render({}, { route }) {
    switch (route) {
      case 'landing':
        return <Landing />
      default:
        return <div>Hello, world!</div>
    }
  }
}

export default App;