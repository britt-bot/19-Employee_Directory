import React, { Component } from "react";
import './index.css';
import axios from "axios";

class App extends Component {
  state = {
    result: [],
    search: "",
    error: ""
  };

  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=20')
      .then(res => {
        console.log(res);
        this.setState({ result:res.data.results });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {this.state.result.map((user, idx) => (
          <p key={idx}>
          {user.name.first} {user.name.last} 
          </p>
        ))}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
  }
}

export default App;
