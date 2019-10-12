import React from 'react';
import { Route } from 'react-router-dom';

// COMPONENTS
import Home from './pages/home';
import Prep from '../components/prep';
import Contacts from '../components/contacts';


const Routes = props => {
	return (
		<div className="content-container">
			<Route exact path="/" render={
				() => <Home user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/prep" render={
				() => <Prep user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/contacts" render={
				() => <Contacts user={props.user} updateUser={props.updateUser} />
			} />
		</div>
	)
}

export default Routes;