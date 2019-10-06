import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SERVER_URL from '../../constants';

class Login extends React.Component {

	state = {
		email: '',
		password: '',
		message: ''
	}

	handleSubmit = (e) => {
		e.preventDefault();
		axios.post(`${SERVER_URL}/auth/login`, this.state)
		.then(response => {
			// Assign token
			// Store token in local storage
			localStorage.setItem('serverToken', response.data.token);
			// Update app with user info
			this.props.updateUser();
		})
		.catch(err => {
			console.log('ERROR: Unable to log in', err.response.data);
			this.setState({ message: `${err.response.status}: ${err.response.data.message}`})
		})
	}

	render() {
		if (this.props.user) {
			return <Redirect to="/profile" />
		}

		return (
			<div>
				<h2>Login</h2>
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