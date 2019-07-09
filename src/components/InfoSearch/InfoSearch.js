import React from 'react';
import '../../stylesheets/infosearch.css'
const InfoSearch = props => {
    return(
        <div id='main-container'>
            <div id='main-flexbox'>
                <div id='queue-path'>{props.arrayType}: {props.array}</div>
                <div id='visited-search'>{props.resultsType}: {props.results}</div>
            </div>
        </div>
    )
}

export default InfoSearch;