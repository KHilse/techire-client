import React from 'react';

const TaskItem = props => {

    let content = <></>;
    let date = new Date(props.task.reminderDate);
    let formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

    if (!props.task.completed) {
        content = (
        <div className={props.divClass}>
            <p className="task-item"><strong>{props.task.name}</strong></p>
            <p className="task-item">{props.task.action}</p>
            <p className="task-item">Not Completed</p>
            <p className="task-item">{formattedDate}</p>
            <input id={props.task._id} type="button" value="Mark Complete" onClick={props.handleTaskItemComplete} />
        </div>
        )
    } else {
        content = (
        <div className={props.divClass}>
            <p className="task-item">{props.task.name}</p>
            <p className="task-item">{props.task.action}</p>
            <p className="task-item">Completed</p>
            <p className="task-item">{formattedDate}</p>
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