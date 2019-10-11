import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SERVER_URL from '../constants';

const Tasks = props => {

    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        console.log(`Building tasks list for user ${props.user._id}`);
        Axios.get(SERVER_URL + '/tasks/' + props.user._id)
        .then(tasks => {
            console.log('TASKS', tasks);
            setTaskList(tasks.data);
        })
        .catch(err => {
            console.log('ERROR getting tasks from API');
        })
    },[props.user])

    return (
        <div className="tasks-container">
            <p>Current Tasks</p>
            {taskList.map((task, i) => {
                let divClass = '';
                let dateDelta = new Date(task.reminderDate).getDate() - new Date().getDate;
                if (dateDelta === 0) {
                    divClass='task-due-today';
                } else if (dateDelta < 3) {
                    divClass='task-due-soon';
                } else {
                    divClass='task-due-eventually';
                }
                return (
                    <div key={i} id={i} className={divClass}>
                        <p>{task.name}</p>
                        <p>{task.action}</p>
                        <p>{task.completed}</p>
                        <p>{task.reminderDate}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Tasks;