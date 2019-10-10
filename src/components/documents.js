import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Documents = props => {

    const googleToken = localStorage.getItem('googleToken');
    const [docs, setDocs] = useState([]);
    const [workingFolder, setWorkingFolder] = useState([]);

    // console.log('USER:');
    // console.log(props.user);

    function handleFolderSelect(e) {
        console.log("HANDLEFOLDERSELECT");
        console.log(encodeURI(e.target.id));
        // axios.post(SERVER_URL + '/documents/setworkingfolder?f=' + encodeURI(e.target.id))
        // .then(res => {
        //     setWorkingFolder(e.target.id);
        // })
    }


    useEffect(() => {

        if (props.user.workingFolder) {
            setWorkingFolder(props.user.workingFolder);
        } else {
            setWorkingFolder(
                <>
                    No working folder selected. Select one folder below or <a href="#" id="new" onClick={handleFolderSelect}>create a tecHire folder</a>
                </>
            )
        }

 

        axios.get('https://www.googleapis.com/drive/v3/files', {
            headers: {
                'Authorization': `Bearer ${googleToken}`
            }
        })
        .then(data => {
            console.log('DRIVE DATA:');
            console.log(data);

            let folders = data.data.files.filter(folder => {
                if (folder.mimeType.includes('vnd.google-apps.folder')) {
                    return folder;
                }
            })
            // console.log(`found ${folders.length} folders`);
            let foldersList = folders.map((folder, i) => {
                return <li key={i} id={folder.id} className="pointer" onClick={handleFolderSelect}>{folder.name}</li>
            })
            // console.log(foldersList);
            setDocs(foldersList);
        }) 
        .catch(err => {
            console.log(err);
        })    
    }, [props.user, googleToken])

    return (
        <div className="documents-container">
            <ul>
                {workingFolder}
                {docs}
            </ul>
        </div>
    )
}

export default Documents;