import React, { useState, send } from 'react';
import axios from 'axios';
import SERVER_URL from '../constants';

const Documents = props => {

    const googleToken = localStorage.getItem('googleToken');
    const [docs, setDocs] = useState([]);

   axios.get('https://www.googleapis.com/drive/v3/files', {
        headers: {
            'Authorization': `Bearer ${googleToken}`
        }
    })
    .then(data => {
        console.log(data);
    }) 
    .catch(err => {
        console.log(err);
    })     



    // Axios.get(SERVER_URL + '/documents',{ params: {}, headers: {
    //     'authorization': googleToken
    // }},)
    // .then(response => {
    //     console.log(response.data);
    //     setDocs(['Docs go here'])
    // })
    // .catch(err => {
    //     console.log(err);
    //     setDocs('Failed to get documents');
    // })


    return (
        <div className="documents-container">
            <p>{docs}</p>
        </div>
    )
}

export default Documents;