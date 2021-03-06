import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import SERVER_URL from '../constants';
import axios from 'axios';

const Nav = props => {

	function responseGoogle(response) {
		console.log(response);
		if (response.AccessToken) {
			localStorage.setItem('googleToken', response.accessToken);
		} else {
			localStorage.setItem('googleToken', response.Zi.access_token)
		}
		localStorage.setItem('googleId', response.googleId);
		axios.post(`${SERVER_URL}/auth/login`, response)
		.then(res => {
			localStorage.setItem('serverToken', res.data.token);
			props.updateUser();
		})
		.catch(err => {
			console.log('SERVER failed to login user');
		})
	}

	function handleGoogleLogout() {
		localStorage.setItem('googleToken', null);
		localStorage.setItem('serverToken', null);
		localStorage.setItem('googleId', null);
		props.updateUser();
	}

	let links = '';

	// If user is logged in, show profile page and logout links
	if (props.user) {
		links = (
			<span>
				<li><Link to="/prep">Prep</Link></li>
			</span>
		)
	} else {
		links = (
			<span>
				<li>Log in with Google to start ==></li>
			</span>
		)
	}

	return (
		<nav>
			<div className="nav-menu">
				<ul>
					<li><Link to="/">Dashboard</Link></li>
					{links}
				</ul>
			</div>
			<div className="google-buttons">
				<span className="google-status">{(props.user ? 'Logged In' : 'Logged Out')}</span>
				<GoogleLogin 
					clientId="703741484512-tdhp2ed5337aqdjgp8dfm6te2ob3mfe8.apps.googleusercontent.com"
					buttonText="Login"
					scope='https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive'
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>&nbsp;
				<GoogleLogout 
					clientId="703741484512-tdhp2ed5337aqdjgp8dfm6te2ob3mfe8.apps.googleusercontent.com"
					buttonText="Logout"
					onLogoutSuccess={handleGoogleLogout}
				/>
			</div>
		</nav>
	)
}

export default Nav;