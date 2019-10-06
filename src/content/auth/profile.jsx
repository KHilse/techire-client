import React from 'react';
import { Redirect } from 'react-router-dom';

const Profile = props => {

	if (!props.user) {
		return <Redirect to="/" />
	}

	return (
		<div>
			<h2>{props.user.firstname}'s Profile</h2>
			<p>{props.user.firstname}</p>
			<p>{props.user.lastname}</p>
			<p>{props.user.email}</p>
			<p>{props.user.notepad}</p>
		</div>

	)
}

export default Profile;