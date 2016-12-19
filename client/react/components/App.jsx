import React, { Component } from 'react';
//import { Navbar } from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyState: '',
    };
  }

  render() {
    return (
      <div id="app-root">
        <div className="container">
          { this.props.children ? this.props.children : null }
        </div>
      </div>
    );
  }
}



export default App;
