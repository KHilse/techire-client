import React from 'react';
import { Route } from 'react-router-dom';

// COMPONENTS
import Home from './pages/home';
import Profile from './auth/profile';
import Signup from './auth/signup';
import Login from './auth/login';


const Routes = props => {
	return (
		<div className="content-container">
			<Route exact path="/" render={
				() => <Home user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/profile" render={
				() => <Profile user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/login" render={
				() => <Login user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/signup" render={
				() => <Signup user={props.user} updateUser={props.updateUser} />
			} />
		</div>
	)
}

export default Routes;