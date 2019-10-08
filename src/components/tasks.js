import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SERVER_URL from '../constants';

const Tasks = props => {

    const [taskList, setTaskList] = useState(null);

    useEffect(() => {
        Axios.get(SERVER_URL + '/tasks/' + props.user._id)
        .then(tasks => {
            console.log('TASKS', tasks);
            setTaskList(tasks.data.map((task, i) => {
                return (
                    <div id={i}>
                        <p>{task.name}</p>
                        <p>{task.action}</p>
                        <p>{task.completed}</p>
                        <p>{task.reminderDate}</p>
                    </div>
                )
            }))
        })
        .catch(err => {
            console.log('ERROR getting tasks from API');
        })


    },[props.user])

    return (
        <div className="tasks-container">
            <p>Current Tasks</p>
            {taskList}
        </div>
    )
}

export default Tasks;