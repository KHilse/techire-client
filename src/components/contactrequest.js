import React from 'react';

/** This component displays the info below in the contact history below the contact form */
const ContactRequest = props => {

    let date = new Date(props.date);
    let formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

    return (
        <p>{props.type} on {formattedDate}</p>
    )
}

export default ContactRequest;