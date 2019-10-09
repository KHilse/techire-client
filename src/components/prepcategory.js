import React, { useState } from 'react';

const PrepCategory = props => {

    let currentItem = props.currentItem;
    let prep = props.prep;



    return (
        <div className="prep-category" onClick={props.handleCategoryClick}>
            <h2>{prep.category}</h2>
        </div>
    )
}


export default PrepCategory;