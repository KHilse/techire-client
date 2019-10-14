import React, { useState } from 'react';

const PrepItem = props => {

    const [expanded, setExpanded] = useState(false);

    let currentCategory = props.currentCategory;
    let prep = props.prep;

    /** Expands the item to show the details, or
     *    compacts the item to just the name */
    function handleExpanded(e) {
        if (e.target.type !== 'button') {
            setExpanded(!expanded);
        }
    }

    if (currentCategory !== -1 && prep.category !== currentCategory) {
        return (<></>)
    } 

    let statusClass = '';
    switch (props.status) {
        case 'Not Started':
            statusClass='status-not-started';
            break;
        case 'In Progress':
            statusClass='status-in-progress';
                break;
        case 'Completed':
            statusClass='status-completed';
                break;
        default:
            break;
    }

    let content = <></>;
    if (expanded) {
        content = (
            <>
                <p dangerouslySetInnerHTML={{ __html: prep.description }}></p>
                <input id={props.id} name={props.name} type="button" onClick={props.handleStatusChange} value={props.status} />
            </>
        )
    }

    return (
        <div className={statusClass} onClick={handleExpanded}>
            <p className="status">{prep.caption}</p>
            {content}
       </div>
    )
}

export default PrepItem;