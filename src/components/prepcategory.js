import React, { useState } from 'react';

const PrepCategory = props => {

    let currentItem = props.currentItem;
    let prep = props.prep;



    return (
        <div id={props.id} name={props.name} className="prep-category" onClick={props.handleCategoryClick}>
            <h2>{prep.category}</h2>
        </div>
    )
}


export default PrepCategory;