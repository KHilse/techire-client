import React from 'react';

const ContactRequest = props => {
    console.log(`ContactRequest, props=${props.data}`);
    return (
        <p>{props.data.type} on {props.data.date}</p>
    )
}


export default ContactRequest;