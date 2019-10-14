import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../constants';
import Contact from './contact';

const Contacts = props => {

    const [addFormVisible, setAddFormVisible] = useState(false);
    const [addFormButtonText, setAddFormButtonText] = useState('Add new contact...');

    // Form state
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [relationship, setRelationship] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [howHelpful, setHowHelpful] = useState('');   
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get(`${SERVER_URL}/contacts/${props.user._id}`)
        .then(contactList => {
            setContacts(contactList.data);
        })
        .catch(err => {
            console.log('ERROR getting contacts list from API');
        })     
    },[props.user]);


    /** Opens and closes the Add New Contact form */
    function handleContactFormDisplay() {
        let isVisible = addFormVisible;
        setAddFormVisible(!isVisible);
        if (!isVisible) {
            setAddFormButtonText('Hide form');
        } else {
            setAddFormButtonText('Add new contact...');
        }
    }

    /** Creates a new db Contact record through the API */
    function handleAddNewContact(e) {
        e.preventDefault();
        let formData = { 
            userId: props.user._id,
            name: name,
            company: company,
            jobTitle: jobTitle,
            email: email,
            relationship: relationship,
            linkedInUrl: linkedInUrl,
            howHelpful: howHelpful            
        };

        axios.post(`${SERVER_URL}/contacts/new`, formData)
        .then(result => {

            // Clear form
            setName('');
            setCompany('');
            setJobTitle('');
            setEmail('');
            setRelationship('');
            setLinkedInUrl('');
            setHowHelpful('');

            // Refresh the UI to match
            let c = [...contacts];
            c.push(result.data);
            setContacts(c);
            props.refreshTasks();
        })
        .catch(err => {
            console.log('ERROR adding new contact', err);
        })
    }

    /** Deletes the db Contact record through the API */
    function handleDelete(userId, contactId) {
        axios.delete(`${SERVER_URL}/contacts/${userId}/delete/${contactId}`)
        .then(result => {
            let c = [...contacts];
            let cIndex = c.findIndex((c) => {
                return c._id === result._id;
            })
            c.splice(cIndex, 1);
            setContacts(c);
        })
        .catch(err => {
            console.log('ERROR deleting contact', err);
        })
    }

    /** Updates the db Contact record when the form data is changed */
    function handleUpdate(userId, contactId, formData) {
        axios.put(`${SERVER_URL}/contacts/${userId}/update/${contactId}`, formData)
        .catch(err => {
            console.log('ERROR updating contact', err);
        })
    }

    return (
        <div className="contacts-container">
            {addFormVisible ? 
                <form id="contact-add-form" onSubmit={handleAddNewContact}>
                    <input name="name" type="text" placeholder="Contact name" value={name} onChange={e => setName(e.target.value)} /><br />
                    <input name="company" type="text" placeholder="Contact's company" value={company} onChange={e => setCompany(e.target.value)} /><br />
                    <input name="jobTitle" type="text" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} /><br />
                    <input name="email" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    <input name="relationship" type="text" placeholder="Your relationship to contact" value={relationship} onChange={e => setRelationship(e.target.value)} /><br />
                    <input name="linkedInUrl" type="text" placeholder="LinkedIn URL" value={linkedInUrl} onChange={e => setLinkedInUrl(e.target.value)} /><br />
                    <input name="howHelpful" type="text" placeholder="How is this person helpful to you?" value={howHelpful} onChange={e => setHowHelpful(e.target.value)} /><br />
                    <input type="submit" value="Add new contact" />
                </form>
                :
                <></>
            }
            <input id="contact-button-add" type="button" value={addFormButtonText} onClick={handleContactFormDisplay} />
            {contacts.map((c, i) => {
                return (
                    <Contact key={i} data={c} handleDelete={handleDelete} handleUpdate={handleUpdate} tasks={props.tasks} setTasks={props.setTasks} refreshTasks={props.refreshTasks} />
                )
            })}
        </div>
    )
}

export default Contacts;