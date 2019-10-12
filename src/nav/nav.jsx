import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import SERVER_URL from '../constants';
import axios from 'axios';

const Nav = props => {

	// function handleClick(e) {
	// 	e.preventDefault();

	// 	const authWindow = window.open(`${SERVER_URL}/auth/google`,'_blank')
	// 	const authPromise = new Promise((resolve, reject) => {
	// 		window.addEventListener('message', (msg) => {
	// 			if (!msg.origin.includes(`${window.location.protocol}//${window.location.host}`)) {
	// 				authWindow.close();
	// 				reject('not allowed');	
	// 			}
	// 			if (msg.data.payload) {
	// 				try {
	// 					resolve(JSON.parse(msg.data.payload));
	// 				}
	// 				catch (e) {
	// 					resolve(msg.data.payload);
	// 				}
	// 				finally {
	// 					authWindow.close();
	// 				}
	// 			} else {
	// 				authWindow.close();
	// 				reject('unauthorized');
	// 			}
	// 		}, false)
	// 	})
	// 	.then(result => {
	// 		console.log(result);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	})
	// 	//return authPromise;


	// 	axios.get(`${SERVER_URL}/auth/google`)
	// 	.then(response => {
	// 		console.log("GOOGLE AUTH RESPONSE", response);
	// 	})	
	// }

	function responseGoogle(response) {
		if (response.AccessToken) {
			localStorage.setItem('googleToken', response.accessToken);
		} else {
			localStorage.setItem('googleToken', response.Zi.access_token)
		}
		localStorage.setItem('googleId', response.googleId);
		axios.post(`${SERVER_URL}/auth/login`, response)
		.then(res => {
			console.log('SERVER TOKEN:', res.data);
			localStorage.setItem('serverToken', res.data.token);
			props.updateUser();
		})
		.catch(err => {
			console.log('SERVER failed to login user');
		})
		console.log(response);
	}

	function handleGoogleLogout() {
		localStorage.setItem('googleToken', null);
		localStorage.setItem('serverToken', null);
		localStorage.setItem('googleId', null);
		props.updateUser();
	}

	// function handleLogout(e) {
	// 	e.preventDefault();
	// 	// Remove the token from local storage
	// 	localStorage.removeItem('serverToken');
	// 	props.updateUser();
	// }

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