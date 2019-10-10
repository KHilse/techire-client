import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../constants';
import Contact from './contact';

const Contacts = props => {

    const [addFormVisible, setAddFormVisible] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [relationship, setRelationship] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [howHelpful, setHowHelpful] = useState('');   
    const [contacts, setContacts] = useState([]);

    //const [addForm, setAddForm] = useState(<></>);


    function handleContactFormDisplay() {
        let isVisible = addFormVisible;
        if (isVisible) { // User clicked the Add button twice, close the form
            //setAddForm(<></>);
        } else { // display the form
            //setAddForm((
            //     <form id="contact-add-form" onSubmit={handleAddNewContact}>
            //         <input name="name" type="text" placeholder="Contact name" value={name} onChange={e => setName(e.target.value)} /><br />
            //         <input name="company" type="text" placeholder="Contact's company" value={company} onChange={e => setCompany(e.target.value)} /><br />
            //         <input name="jobTitle" type="text" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} /><br />
            //         <input name="email" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            //         <input name="relationship" type="text" placeholder="Your relationship to contact" value={relationship} onChange={e => setRelationship(e.target.value)} /><br />
            //         <input name="linkedInUrl" type="text" placeholder="LinkedIn URL" value={linkedInUrl} onChange={e => setLinkedInUrl(e.target.value)} /><br />
            //         <input name="howHelpful" type="text" placeholder="How is this person helpful to you?" value={howHelpful} onChange={e => setHowHelpful(e.target.value)} /><br />
            //         <input type="submit" value="Add new contact" />
            //     </form>
    
            // ))
        }
        setAddFormVisible(!isVisible);
    }

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
        console.log(formData);
        axios.post(`${SERVER_URL}/contacts/new`, formData)
        .then(result => {

        })
        .catch(err => {
            console.log('ERROR adding new contact', err);
        })
    }

    function handleDelete(userId, contactId) {
        axios.delete(`${SERVER_URL}/contacts/${userId}/delete/${contactId}`)
        .then(result => {
            let c = contacts;
            let cIndex = c.findIndex(i => { return i._id === contactId });
            if (cIndex >= 0) {
                c = c.splice(cIndex,1);
                setContacts(c);
            }
        })
        .catch(err => {
            console.log('ERROR deleting contact', err);
        })
    }

    useEffect(() => {
        // Get contacts from db through API
        axios.get(`${SERVER_URL}/contacts/${props.user._id}`)
        .then(contactList => {
            console.log('contactList:');
            console.log(contactList.data);
            setContacts(contactList.data);
            // let newList = contactList.data.map((c, i) => {
            //     return (
            //         <Contact key={i} data={c} handleDelete={handleDelete} />
            //     )
            // })
            // setContacts(newList);
        })
        .catch(err => {
            console.log('ERROR getting contacts list from API');
        })
    },[props.user]);

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
            <input id="contact-button-add" type="button" value="+" onClick={handleContactFormDisplay} />
            {contacts.map((c, i) => {
                return (
                    <Contact key={i} data={c} handleDelete={handleDelete} />
                )
            })}
        </div>
    )
}

export default Contacts;