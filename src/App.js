import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import { BrowserRouter as Router} from 'react-router-dom';
import SERVER_URL from './constants';

// SOURCES
import './App.css';
import Header from './nav/header';
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
      console.log('Token:', token);
      console.log('SERVER_URL:', SERVER_URL);
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('Success:', response);
        this.setState({ user: response.data.user });
      })
      .catch(err => {
        console.log("ERROR getting token", err);
      })
    } else {
      console.log("NO TOKEN, NO USER");
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
          <Header />
          <Routes user={this.state.user} updateUser={this.getUser} />
        </div>
      </Router>
    );
  }
}

export default App;
