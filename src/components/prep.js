import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SERVER_URL from '../constants';
import PrepItem from './prepitem';
import PrepCategory from './prepcategory';

const Prep = props => {

    const [currentCategory, setCurrentCategory] = useState(-1);
    const [prepsList, setPrepsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        // console.log('useEffect called');
        Axios.get(SERVER_URL + '/preps/' + props.user._id)
        .then(preps => {
            console.log('PREPS FROM DB', preps.data);
            setPrepsList(preps.data);
            setCurrentCategory(preps.data[0].category);

            let catIndex = '';
            let cats = [];
            let statusByCategory;
            console.log('preps.data.length', preps.data.length);
            preps.data.forEach(prep => {
                if (prep.category !== catIndex) { // new category
                    statusByCategory = [];
                    statusByCategory.push([0,0,0]); // initialize counts per category: [not started, in progress, completed]
                    catIndex = prep.category;
                    cats.push(catIndex);
                }
                switch (prep.status) {
                    case 'Not Started':
                        statusByCategory[statusByCategory.length - 1][0]++;
                        break;
                    case 'In Progress':
                        statusByCategory[statusByCategory.length - 1][1]++;
                        break;
                    case 'Completed':
                        statusByCategory[statusByCategory.length - 1][2]++;
                        break;
                    default:
                        break;
                }
            })
            setCategories(cats);
            setCategoryStats(statusByCategory);
        })
        .catch(err => {
            console.log('ERROR getting preps from API', err);
        })
    }, [props.user, refresh])

    function handleCategoryClick(e) {
        let t = e.currentTarget.getAttribute('name');
        if (t === currentCategory) {
            setCurrentCategory(-1);
        } else {
            setCurrentCategory(t);
        }
    }

    function handleItemStatusChange(e) {
        e.preventDefault();
        console.dir(`e.target.value=${e.target.value}`);
        let itemId = e.target.name;
        let currentStatus = e.target.value;
        let newStatus = '';
        switch(currentStatus) {
            case 'Not Started':
                newStatus = 'In Progress';
                break;
            case 'In Progress':
                newStatus = 'Completed';
                break;
            case 'Completed':
                newStatus = 'Not Started';
                break;
            default:
                break;
        }
        let updateString = SERVER_URL + '/preps/' + props.user._id + '/' + itemId;
        Axios.put(updateString, { status: newStatus })
        .then(result => {
            // Update prepsList with new status
            let index = prepsList.findIndex(prep => {
                return prep._id === itemId;
            })

            if (index >=0) {
                let nl = JSON.parse(JSON.stringify(prepsList));
                nl[index].status = newStatus;
                setPrepsList(nl);
                console.log('NEW PREPS:');
                console.log(prepsList);
            }
        })
        .catch(err => {
            console.log('ERROR updating prep item status', err);
        })
        setRefresh(!refresh);
    }

    console.log('categories');
    console.log(categories)
    console.log('categoryStats');
    console.log(categoryStats);    

    if (categoryStats.length > 0) {
        let catIndex = '';
        console.log(`currentCategory=${currentCategory}`);
        return (
            <div className="prep-container">
                {prepsList.map((prep, i) => {
                    let cat = <></>;
                    if (prep.category !== catIndex) { // New category
                        catIndex = prep.category;
                        let statsIndex = categories.indexOf(catIndex);
                        console.log(`catIndex: ${catIndex}, statsIndex: ${statsIndex}, categoryStats.length: ${categoryStats.length}`);
                        cat = (
                            <PrepCategory
                                key={1000+i}
                                id={prep._id}
                                name={prep.category} 
                                currentCategory={currentCategory} 
                                prep={prep} 
                                handleCategoryClick={handleCategoryClick} 
                                statsNotStarted={categoryStats[statsIndex][0]}
                                statsInProgress={categoryStats[statsIndex][1]}
                                statsCompleted={categoryStats[statsIndex][2]}
                            />
                        )
                    }
                    let item = <></>;
                    if (catIndex === currentCategory) {
                        item = (
                            <PrepItem key={i} name={prep._id} prep={prep} currentCategory={currentCategory} status={prep.status} handleStatusChange={handleItemStatusChange} />
                        )
                    }
                    return (
                        <>
                        {cat}
                        {item}
                        </>
                    )    
                })}
            </div>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }


}

export default Prep;