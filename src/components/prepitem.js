import React, { useState } from 'react';

const PrepItem = props => {

    const [expanded, setExpanded] = useState(false);

    let currentCategory = props.currentCategory;
    let prep = props.prep;

    function handleExpanded(e) {
        console.log(`e.target.type=${e.target.type}`)
        if (e.target.type != 'button') {
            setExpanded(!expanded);
        }
    }

    // console.log(`prep.category=${prep.category}, currentCategory=${currentCategory}`)
    if (currentCategory != -1 && prep.category != currentCategory) {
        return (<></>)
    } 

    let content = <></>;
    if (expanded) {
        content = (
            <>
                <p dangerouslySetInnerHTML={{ __html: prep.description }}></p>
            </>
        )
    }

    let statusClass = '';
    switch (prep.status) {
        case 'Not Started':
            statusClass='status-not-started';
            break;
        case 'In Progress':
            statusClass='status-in-progress';
                break;
        case 'Completed':
            statusClass='status-completed';
                break;
    }
    return (
        <div className="prep-item" onClick={handleExpanded}>
            <p>{prep.caption}</p>
            {content}
            <input className={statusClass} type="button" onClick={props.handleStatusChange} value={prep.status} />
       </div>
    )
}


export default PrepItem;