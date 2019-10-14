import dotenv from 'dotenv';
dotenv.config();
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom';

const SERVER_URL = process.env.SERVER_URL;

// SOURCES
import './App.css';
// VNEXT: import Header from './nav/header';
import Nav from './nav/nav'
import Routes from './content/routes';

class App extends React.Component {

  state = {
    user: null
  }

  getUser = () => {
    // See if a token exists
    let token = localStorage.getItem('serverToken');

    // If there's a token use it to get the user info
    if (token) {
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        this.setState({ user: response.data.user });
      })
      .catch(err => {
        console.log("ERROR getting token", err);
      })
    } else { // No token, no user
      this.setState({ user: null });
    }
  }

  componentDidMount() {
    // Look for a token
    this.getUser();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav user={this.state.user} updateUser={this.getUser} />
          {/* VNEXT: <Header user={this.state.user} updateUser={this.getUser} /> */}
          <Routes user={this.state.user} updateUser={this.getUser} />
        </div>
      </Router>
    );
  }
}

export default App;
