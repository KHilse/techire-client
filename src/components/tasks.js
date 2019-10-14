import dotenv from 'dotenv';
dotenv.config();
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TaskItem from './taskitem';

const SERVER_URL = process.env.SERVER_URL;

/** This component is the container for the Tasks pane
 *    It displays TaskItem components */
const Tasks = props => {

    const [taskList, setTaskList] = useState([]);
    const [completedList, setCompletedList] = useState([]);

    useEffect(() => {
        let openTasks = [];
        let completeTasks = [];

        props.tasks.forEach(task => {
            if (task.completed) {
                completeTasks.push(task);
            } else {
                openTasks.push(task);
            }
        })

        setTaskList(openTasks);
        setCompletedList(completeTasks);
    },[props.user,props.tasks]);

    /** Handles when a TaskItem is marked complete by the user
     *    Makes a PUT call to the API and updates the db Task item */
    function handleTaskItemComplete(e) {
        // task id is the id of the button calling this handler
        let taskId = e.target.id;
        let updateString = `${SERVER_URL}/tasks/${props.user._id}/${taskId}/update`;
        Axios.put(updateString, { completed: true })
        .then(result => {
            props.refreshTasks();
        })
        .catch(err => {
            console.log('ERROR updating task item status', err);
        })
    }

    return (
        <div className="tasks-container">
            <p className="task-list-heading">Current Tasks</p>
            {taskList.map((task, i) => {
                let divClass = '';
                let reminderDate = new Date(task.reminderDate);
                let now = new Date();
                let dateDelta = reminderDate.getDate() - now.getDate();
                if (dateDelta < 0) {
                    divClass='task-overdue';
                } else if (dateDelta === 0) {
                    divClass='task-due-today';
                } else if (dateDelta < 3) {
                    divClass='task-due-soon';
                } else {
                    divClass='task-due-eventually';
                }
                return (
                    <TaskItem key={i} divClass={divClass} task={task} handleTaskItemComplete={handleTaskItemComplete} />
                )
            })}
            <p className="task-list-heading">Completed Tasks</p>
            {completedList.map((task, i) => {
                return (
                    <TaskItem key={i} divClass="task-completed" task={task} handleTaskItemComplete={handleTaskItemComplete} />
                )
            })}
        </div>
    )
}

export default Tasks;