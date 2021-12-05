import React, { useState } from 'react';

import globalStyles from '../../styles/Home.module.css';
import styles from '../../styles/BracketCreator.module.scss';
import Header from "../../components/Header";
import {GetBreweriesNamesAndIds} from "../api/catalog-beer";
import ActiveBracketCard from '../../components/ActiveBracketCard';


export default function BracketCreator({ populatedBreweries }) {
    const [currentBracket, setCurrentBracket] = useState([]); 
    const [dropdownValue, setDropdownValue] = useState("");

    function addToCurrentBracket(breweryName) {
        //find object by its name
        var breweryObj = populatedBreweries.find(temp => {
            temp.name === breweryName;
        })

        console.log(breweryObj)

        setCurrentBracket([...currentBracket, breweryObj]);
    }

    function addCustomBrewery() {

    }

    var breweryDropdownOptions = populatedBreweries.map(breweryObj => {
        return <option value={breweryObj.name}>{breweryObj.name}</option>;
    });

    var currentBracketCards = currentBracket.map(breweryObj => {
        console.log(breweryObj)
        return <ActiveBracketCard name={breweryObj.name} bracketId={breweryObj.id}/>
    })

    return (
        <div>
            <Header
            />
            <h2>Add Breweries</h2>
            <hr />
            <div className={styles.pageContentContainer}>
                <div className={styles.creationContainer}>
                    <div className={styles.addBrewsCont}>
                        <h3>Breweries</h3>
                        <div className={styles.addBreweryContainer}>
                            <div className={styles.addBreweryDropdownContainer}>
                                <select defaultValue="Select a brewery" name="Breweries" id={styles.addBreweryDropdown}
                                onChange={(e) => {
                                    setDropdownValue(e.target.value);
                                    console.log(e.target.value)
                                }}>
                                    {breweryDropdownOptions}
                                </select>
                                <button onClick={() => addToCurrentBracket(dropdownValue)}>Add</button>
                            </div>
                        </div>
                        <div className={styles.addCustomCont}>
                            <div className={styles.labelInputPair}>
                                <label htmlFor="custom brewery">Custom Brewery</label>
                                <input id="custom brewery" type="text" autoComplete="name" />
                            </div>
                            <button onClick={addCustomBrewery()}>Add</button>
                        </div>
                    </div>
                    <div className={styles.verticalDividerDiv}></div>
                    <div className={styles.currentBreweries}>
                        <h3>The Current Competition</h3>
                        {currentBracketCards}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    var populatedBreweries = await GetBreweriesNamesAndIds();

    return {
        props: {
            populatedBreweries
        }
    }
}
