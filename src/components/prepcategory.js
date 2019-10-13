import React from 'react';

const PrepCategory = props => {

    let prep = props.prep;
    let statsCount = props.statsNotStarted + props.statsInProgress + props.statsCompleted;
    let ns = (100 * props.statsNotStarted / statsCount).toFixed(0);
    let ip = (100 * props.statsInProgress / statsCount).toFixed(0);
    let cp = (100 * props.statsCompleted / statsCount).toFixed(0);

    return (
        <div id={props.id} name={props.name} className="prep-category" onClick={props.handleCategoryClick}>
            <h2 className="prepcategory-heading">{prep.category}&nbsp;</h2>
            <p className="prepcategory-heading">{ns}% Not Started, {ip}% In Progress, {cp}% Completed</p>
        </div>
    )
}


export default PrepCategory;