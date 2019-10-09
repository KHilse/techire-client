import React, { useState } from 'react';

const PrepItem = props => {

    let currentItem = props.currentItem;
    let prep = props.prep;

    return (
        <div>
            <p>{prep.caption}</p>
            <p dangerouslySetInnerHTML={{ __html: prep.description }}></p>
            <p>{prep.status}</p>
        </div>
    )
}


export default PrepItem;