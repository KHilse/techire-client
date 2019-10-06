import React from 'react';
import { Route } from 'react-router-dom';

// COMPONENTS
import Home from './pages/home';
import Profile from './auth/profile';
import Signup from './auth/signup';
import Login from './auth/login';


const Routes = props => {
	return (
		<div className="container">
			<Route exact path="/" component={Home} />
			<Route path="/profile"  render={
				() => <Profile user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/login"  render={
				() => <Login user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/signup" render={
				() => <Signup user={props.user} updateUser={props.updateUser} />
			} />
		</div>
	)
}

export default Routes;