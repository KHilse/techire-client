import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SERVER_URL from '../../constants';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Login extends React.Component {

	state = {
		email: '',
		password: '',
		message: ''
	}

	handleClick(e) {
		e.preventDefault();

		const authWindow = window.open(`${SERVER_URL}/auth/google`,'_blank')
		const authPromise = new Promise((resolve, reject) => {
			window.addEventListener('message', (msg) => {
				if (!msg.origin.includes(`${window.location.protocol}//${window.location.host}`)) {
					authWindow.close();
					reject('not allowed');	
				}
				if (msg.data.payload) {
					try {
						resolve(JSON.parse(msg.data.payload));
					}
					catch (e) {
						resolve(msg.data.payload);
					}
					finally {
						authWindow.close();
					}
				} else {
					authWindow.close();
					reject('unauthorized');
				}
			}, false)
		})
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			console.log(err);
		})
		//return authPromise;


		axios.get(`${SERVER_URL}/auth/google`)
		.then(response => {
			console.log("GOOGLE AUTH RESPONSE", response);
		})	
	}

	// handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	axios.post(`${SERVER_URL}/auth/login`, this.state)
	// 	.then(response => {
	// 		// Assign token
	// 		// Store token in local storage
	// 		localStorage.setItem('serverToken', response.data.token);
	// 		// Update app with user info
	// 		this.props.updateUser();
	// 	})
	// 	.catch(err => {
	// 		console.log('ERROR: Unable to log in', err.response.data);
	// 		this.setState({ message: `${err.response.status}: ${err.response.data.message}`})
	// 	})
	// }

	responseGoogle = (response) => {
		localStorage.setItem('googleToken', response.accessToken);
		axios.post(`${SERVER_URL}/auth/login`, response)
		.then(res => {
			localStorage.setItem('serverToken', res.data.token);
			this.props.updateUser();
		})
		console.log(response);
	}

	handleGoogleLogout() {
		localStorage.setItem('googleToken', null);
		localStorage.setItem('serverToken', null);
	}

	render() {
		if (this.props.user) {
			return <Redirect to="/profile" />
		}

		return (
			<div>
				<h2>Login</h2>
				<GoogleLogin 
					clientId="703741484512-tdhp2ed5337aqdjgp8dfm6te2ob3mfe8.apps.googleusercontent.com"
					buttonText="Login"
					scope='https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive'
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>
				<GoogleLogout 
					clientId="703741484512-tdhp2ed5337aqdjgp8dfm6te2ob3mfe8.apps.googleusercontent.com"
					buttonText="Logout"
					onLogoutSuccess={this.handleGoogleLogout}
				/>				
				<span className="red">{this.state.message}</span>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Email:</label>
						<input name="email" onChange={(e) => this.setState({ email: e.target.value })} />
					</div>
					<div>
						<label>Password:</label>
						<input name="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
					</div>
					<button type="submit">Log in!</button>
				</form>
			</div>
		)
	}
}

export default Login;