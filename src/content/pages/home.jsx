import React, { useState, useEffect } from 'react';
import Tasks from '../../components/tasks';
import Contacts from '../../components/contacts';
import Documents from '../../components/documents';
import axios from 'axios';
import SERVER_URL from '../../constants';

const Home = props => {

	const [tasks, setTasks] = useState([]);
	const [refresh, setRefresh] = useState(true);

	let content = null;

	useEffect(() => {
		if (props.user) {
			console.log(`props.user: ${props.user}`)
			axios.get(SERVER_URL + '/tasks/' + props.user._id)
			.then(tasks => {
				console.log('TASKS', tasks.data);
				setTasks([...tasks.data]);
			})
			.catch(err => {
				console.log('ERROR getting tasks from API');
			})
	
		}
	},[props.user, refresh]);


	function refreshTasks() {
		setRefresh(!refresh);
	}



	if (props.user) { // User logged in
		content = (
			<>
			<Tasks user={props.user} tasks={tasks} setTasks={setTasks} refreshTasks={refreshTasks} />
			<Contacts user={props.user} tasks={tasks} refreshTasks={refreshTasks} />
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