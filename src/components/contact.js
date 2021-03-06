import dotenv from 'dotenv';
dotenv.config();
import React, { useState, useEffect } from 'react';
import ContactRequest from './contactrequest';
import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL;

/** This component displays information for a db Contact record retrieved via the API
 *    The user is shown the contact info, with UI for editing, deleting, and spawning
 *    new contact request items
*/
const Contact = props => {

    const [name, setName] = useState(props.data.name);
    const [company, setCompany] = useState(props.data.company);
    const [jobTitle, setJobTitle] = useState(props.data.jobTitle);
    const [email, setEmail] = useState(props.data.email);
    const [relationship, setRelationship] = useState(props.data.relationship);
    const [linkedInUrl, setLinkedInUrl] = useState(props.data.linkedInUrl);
    const [howHelpful, setHowHelpful] = useState(props.data.howHelpful);
    const [contactRequests, setContactRequests] = useState(props.data.outstandingRequests);   
    const [requestType, setRequestType] = useState('');

    // One method of refreshing the display is to update a dependent state so useEffect gets called
    useEffect(() => {
    },[contactRequests]);
    
    /** Handles contact delete user request by bubbling to parent handler */
    function handleDel() {
        props.handleDelete(props.data.userId,props.data._id);
    }

    /** Handles contact update user request by bubbling to parent handler */
    function handleUpdate(e) {

        e.preventDefault();
        let formData = { 
            userId: props.data.userId,
            name: name,
            company: company,
            jobTitle: jobTitle,
            email: email,
            relationship: relationship,
            linkedInUrl: linkedInUrl,
            howHelpful: howHelpful            
        };
        props.handleUpdate(props.data.userId, props.data._id, formData);
    }

    /** Creates a new db Request item related to the current db Contact record */
    function handleAddContactRequest(e) {
        e.preventDefault();
        axios.post(`${SERVER_URL}/contacts/${props.data.userId}/contact/${props.data._id}/newrequest`,  { type: requestType })
        .then(result => {
            let newRequests = [...contactRequests];
            newRequests.push(result.data);
            setContactRequests(newRequests);
            let taskObj = {
                userId: props.data.userId,
                reminderDate: result.data.followUpDate,
                name: result.data.type,
                action: 'Follow up with a reminder or thanks',
                completed: false
            };
            axios.post(`${SERVER_URL}/tasks/${props.data.userId}/new`, taskObj)
            .then(result => {
                props.refreshTasks();  
            })
            .catch(err => {
                console.log('ERROR adding new task for request', err);
            })
        })
        .catch(err => {
            console.log('ERROR while adding new outstanding request to contact', err);
        })
    }

    return (
        <div className="contact">
            <div className="contact-form">
                <form>
                    <input className="contact-form-input-3" name="name" type="text" placeholder="Contact name" value={name} onChange={e => setName(e.target.value)} />
                    <input className="contact-form-input-3" name="company" type="text" placeholder="Contact's company" value={company} onChange={e => setCompany(e.target.value)} />
                    <input className="contact-form-input-3" name="jobTitle" type="text" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} /><br />
                    <input className="contact-form-input-2" name="email" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="contact-form-input-2" name="linkedInUrl" type="text" placeholder="LinkedIn URL" value={linkedInUrl} onChange={e => setLinkedInUrl(e.target.value)} /><br />
                    <input className="contact-form-input-2" name="relationship" type="text" placeholder="Your relationship to contact" value={relationship} onChange={e => setRelationship(e.target.value)} />
                    <input className="contact-form-input-2" name="howHelpful" type="text" placeholder="How is this person helpful to you?" value={howHelpful} onChange={e => setHowHelpful(e.target.value)} />
                </form><br />
                <div className="contact-add-request-form">
                    <form>
                        <input className="contact-form-input-2" name="type" type="text" placeholder="Type of request" value={requestType} onChange={e => setRequestType(e.target.value)} />
                        <input type="button" value="Add Request" onClick={handleAddContactRequest} />
                    </form>
                </div>
                {            <div>
                {contactRequests.map((r,i) => {
                    return (
                        <ContactRequest key={i} type={r.type} date={r.date} />
                    )
                })}
            </div>}
            </div>
            <input className="contact-button-delete" type="button" value="X" onClick={handleDel} />
            <input className="contact-button-update" type="button" value="Update" onClick={handleUpdate} />
        </div>
    )
}

export default Contact;