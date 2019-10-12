import React from 'react';

const TaskItem = props => {

    let content = <></>;
    if (!props.task.completed) {
        content = (
        <div className={props.divClass}>
            <p>{props.task.name}</p>
            <p>{props.task.action}</p>
            <p>Not Completed</p>
            <p>{props.task.reminderDate}</p>
            <input id={props.task._id} type="button" value="Mark Complete" onClick={props.handleTaskItemComplete} />
        </div>
        )
    } else {
        content = (
        <div className={props.divClass}>
            <p>{props.task.name}</p>
            <p>{props.task.action}</p>
            <p>Completed</p>
            <p>{props.task.reminderDate}</p>
        </div>
        )  
    }

    return (
        <div>
        {content}
        </div>
    )
}


export default TaskItem;