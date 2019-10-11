import React, { useState } from 'react';
import ContactRequest from './contactrequest';

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

    function handleDel() {
        props.handleDelete(props.data.userId,props.data._id);
    }

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

    function handleAddContactRequest(e) {
        e.preventDefault();
        props.handleAddContact(props.data.userId, props.data._id, { type: requestType });
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
                {contactRequests.map((r,i) => {
                    return (
                        <ContactRequest data={r} />
                    )
                })
            }
            </div>
            <input className="contact-button-delete" type="button" value="X" onClick={handleDel} />
            <input className="contact-button-update" type="button" value="Update" onClick={handleUpdate} />
        </div>
    )
}


export default Contact;