import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SERVER_URL from '../constants';
import PrepItem from './prepitem';
import PrepCategory from './prepcategory';

const Prep = props => {

    const [currentCategory, setCurrentCategory] = useState(-1);
    const [prepsList, setPrepsList] = useState([]);

    useEffect(() => {
        // console.log('useEffect called');
        Axios.get(SERVER_URL + '/preps/' + props.user._id)
        .then(preps => {
            // console.log('PREPS', preps);
            let catIndex = '';
            let prepsData = [];
            setCurrentCategory(preps.data[0].category);
            preps.data.forEach((prep, i) => {
                // console.log(prep.category, catIndex, currentCategory);
                if (prep.category != catIndex) { // Starting new category, add category header
                    catIndex = prep.category;
                    prepsData.push(<PrepCategory id={i} name={prep.category} currentCategory={currentCategory} prep={prep} handleCategoryClick={handleCategoryClick} />);
                }
                if (prep.category == catIndex) { // Display items for current category only
                    prepsData.push(<PrepItem id={i} name={prep._id} prep={prep} currentCategory={currentCategory} handleStatusChange={handleItemStatusChange} />)
                }
            })
            // console.log('*** PREPS DATA ***');
            // console.log(prepsData);
            setPrepsList(prepsData);
        })
        .catch(err => {
            console.log('ERROR getting preps from API', err);
        })
    }, [props.user])

    function handleCategoryClick(e) {
        setCurrentCategory(e.target.id);
    }

    function handleItemStatusChange(e) {
        e.preventDefault();
        let itemId = e.target.id;
        console.log('STUB - Handle Prep Item Status Change');
    }

    return (
        <div className="prep-container">
            {prepsList}
        </div>
    )
}

export default Prep;