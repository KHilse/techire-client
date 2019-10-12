import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SERVER_URL from '../constants';
import TaskItem from './taskitem';

const Tasks = props => {

    const [taskList, setTaskList] = useState([]);
    const [completedList, setCompletedList] = useState([]);

    useEffect(() => {
        console.log(`Building tasks list for user ${props.user._id}`);
        let openTasks = [];
        let completeTasks = [];
        console.log(`props.tasks: ${props.tasks.length}`);
        props.tasks.forEach(task => {
            if (task.completed) {
                completeTasks.push(task);
            } else {
                openTasks.push(task);
            }
        })
        console.log(`${openTasks.length} open tasks, ${completeTasks.length} complete tasks`);
        setTaskList(openTasks);
        setCompletedList(completeTasks);
    },[props.user,props.tasks]);

    function handleTaskItemComplete(e) {
        // task id is the id of the button calling this handler
        console.log(`handleTaskItemComplete, _id: ${e.target.id}, user._id: ${props.user._id}`);
        let taskId = e.target.id;
        let updateString = `${SERVER_URL}/tasks/${props.user._id}/${taskId}/update`;
        Axios.put(updateString, { completed: true })
        .then(result => {
            // Update task item to be completed
            // let index = taskList.findIndex(task => {
            //     return task._id === result._id;
            // })

            // if (index >=0) {
            //     let nl = [...taskList];
            //     nl[index].completed = true;
            //     setTaskList(nl);
            // }
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