import React from 'react';
import Tasks from '../../components/tasks';
import Applications from '../../components/applications';
import Documents from '../../components/documents';

const Home = props => {

	let content = null;

	if (props.user) { // User logged in
		content = (
			<>
			<Tasks user={props.user} />
			<Applications user={props.user} />
			<Documents user={props.user} />
			</>
		)
	} else { // User not logged in
		content = (
			<>
				<h3>Tec.Hire is a tool for managing your progress towards a new job in the tech industry.</h3>
				<h3>Manage your documents, curate your open applications, and track your communications and status right here in the app.</h3>
				<h3>Find your daily to-do list right here and keep things moving forward!</h3>
			</>
		)
	}

	return (
		<>
			{ content }
		</>
	)
}

export default Home;