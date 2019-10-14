import React, { useEffect } from 'react';
import axios from 'axios';
//import { google } from 'googleapis';

const Documents = props => {

    const googleToken = localStorage.getItem('googleToken');

    // Using the Google Drive API to get the logged-in user's
    // folder Id code. Then we point the iframe to the folder
    useEffect(() => {

        axios.get('https://www.googleapis.com/drive/v3/files', {
            headers: {
                'Authorization': `Bearer ${googleToken}`
            }
        })
        .then(data => {
            let folders = data.data.files.filter(folder => {
                if (folder.mimeType.includes('vnd.google-apps.folder')) {
                    return folder;
                }
            })

            let folderIndex = folders.findIndex(folder => {
                return (folder.name === 'tecHire');
            })

            // if the tecHire folder exists, display it in the docs pane
            if (folderIndex >= 0) {
                let folderId = folders[folderIndex].id;
                localStorage.setItem('folderId', folderId);
            } else {
                console.log('Did not find a tecHire folder');
            }
        }) 
        .catch(err => {
            console.log('ERROR getting Google Drive metadata', err);
        })    
    }, [props.user, googleToken])

    let googleFolderId = localStorage.getItem('folderId');
    let driveUrl = `https://drive.google.com/embeddedfolderview?id=${googleFolderId}#list`;

    return (
        <div className="documents-container">
            {(googleFolderId) ? (
                <iframe src={driveUrl} width="100%" height="500" frameborder="0"></iframe>
            ) : (<p>Can't find a tecHire folder in your google drive. Create one and share it for links only!</p>)
            }
        </div>
    )
}

export default Documents;