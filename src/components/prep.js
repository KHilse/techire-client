import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SERVER_URL from '../constants';


const Prep = props => {

    const [prepsList, setPrepsList] = useState(null);


    useEffect(() => {
        Axios.get(SERVER_URL + '/preps/' + props.user._id)
        .then(preps => {
            console.log('PREPS', preps);
            setPrepsList(preps.data.map((prep, i) => {
                return (
                    <div id={i}>
                        <p>{prep.category}</p>
                        <p>{prep.caption}</p>
                        <p dangerouslySetInnerHTML={{ __html: prep.description }}></p>
                        <p>{prep.completed}</p>
                    </div>
                )
            }))
        })
        .catch(err => {
            console.log('ERROR getting preps from API');
        })
    }, [props.user])

    return (
        <div className="prep-container">
            <p>Display preparation steps here</p>
            {prepsList}
        </div>
    )
}

export default Prep;