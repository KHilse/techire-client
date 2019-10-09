import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SERVER_URL from '../constants';
import PrepItem from './prepitem';
import PrepCategory from './prepcategory';

const Prep = props => {

    const [currentCategory, setCurrentCategory] = useState(-1);
    const [prepsList, setPrepsList] = useState([]);

    useEffect(() => {
        console.log('useEffect called');
        Axios.get(SERVER_URL + '/preps/' + props.user._id)
        .then(preps => {
            console.log('PREPS', preps);
            let catIndex = '';
            let prepsData = [];
            preps.data.forEach((prep, i) => {
                console.log(prep.category, catIndex, currentCategory);
                if (prep.category != catIndex) { // Starting new category, add category header
                    catIndex = prep.category;
                    prepsData.push(<PrepCategory id={prep.category} prep={prep} />);
                }
                if (prep.category == catIndex) { // Display items for current category only
                    prepsData.push(<PrepItem id={i} prep={prep} currentCategory={currentCategory} handleClick={handleClick} />)
                }
            })
            console.log('*** PREPS DATA ***');
            console.log(prepsData);
            setPrepsList(prepsData);
        })
        .catch(err => {
            console.log('ERROR getting preps from API', err);
        })
    }, [props.user])

    function handleClick(e) {
        setCurrentCategory(e.target.id);
    }

    return (
        <div className="prep-container">
            {prepsList}
        </div>
    )
}

export default Prep;