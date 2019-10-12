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

            console.log('FOLDERS');
            console.log(folders);

            let folderIndex = folders.findIndex(folder => {
                return (folder.name === 'tecHire');
            })

            // if the tecHire folder exists, display it in the docs pane
            if (folderIndex >= 0) {

                let folderId = folders[folderIndex].id;
                console.log('Found tecHire folder in Google drive, id:', folderId);
                localStorage.setItem('folderId', folderId);
            } else {
                console.log('Did not find a tecHire folder');
            }



            // // console.log(`found ${folders.length} folders`);
            // let foldersList = folders.map((folder, i) => {
            //     return <li key={i} id={folder.id} className="pointer" onClick={handleFolderSelect}>{folder.name}</li>
            // })
            // // console.log(foldersList);
            // setDocs(foldersList);
        }) 
        .catch(err => {
            console.log(err);
        })    
    }, [props.user, googleToken])

    let googleFolderId = localStorage.getItem('folderId');
    let driveUrl = `https://drive.google.com/embeddedfolderview?id=1d0K07MXxSKnItKvanxbBwu4TegLtt6Pc#list`;

    return (
        <div className="documents-container">
            {(googleFolderId) ? (
                <iframe src={driveUrl} width="100%" height="500" frameborder="0"></iframe>
            ) : (<p>Can't find a tecHire folder in your google drive. Create one!</p>)
            }
        </div>
    )
}

export default Documents;