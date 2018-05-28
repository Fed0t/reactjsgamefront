import React from 'react';
import {browserHistory} from 'react-router';

const GenericNotFound = (props) => {
    return (
            <div className="masthead error segment centered aligned">
                <div className="container">
                    <h1 className="ui dividing ">
                        That happens not to be a page!
                    </h1>
                    <p>Rewind and try another one</p>
                    <p>
                        <button onClick={browserHistory.goBack}>Back</button>
                    </p>
                </div>
            </div>
    );
};
 export default GenericNotFound;