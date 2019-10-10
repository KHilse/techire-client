import React, { useState } from 'react';

const PrepItem = props => {

    const [expanded, setExpanded] = useState(false);

    let currentCategory = props.currentCategory;
    let prep = props.prep;

    function handleExpanded(e) {
        console.log(`e.target.type=${e.target.type}`)
        if (e.target.type !== 'button') {
            setExpanded(!expanded);
        }
    }

    // console.log(`prep.category=${prep.category}, currentCategory=${currentCategory}`)
    if (currentCategory !== -1 && prep.category !== currentCategory) {
        return (<></>)
    } 

    let statusClass = '';
    console.log(`props.status=${props.status}`);
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
            <p>{prep.caption}</p>
            {content}
       </div>
    )
}


export default PrepItem;