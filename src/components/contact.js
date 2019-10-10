import React from 'react';
import axios from 'axios';
import SERVER_URL from '../constants';


const Contact = props => {

    function handleDel() {
        props.handleDelete(props.data.userId,props.data._id);
    }

    return (
        <div>
            <p>{props.data.name}, {props.data.company}, {props.data.email} </p>
            <input type="button" value="X" onClick={handleDel} />
        </div>
    )
}


export default Contact;