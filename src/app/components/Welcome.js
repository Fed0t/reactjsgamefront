import React from "react";
import $ from 'jquery';
import {FormattedMessage} from 'react-intl';
import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: 'You are logged in!',
    message: 'Welcome to our <strong>platform</strong>',
    position: 'bl',
    level:'success',
    dismissible:true,
    autoDismiss: 10,
    // action: {
    //     label: 'Click me!!',
    //     callback: () => alert('clicked!')
    // }
};

class  Welcome extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container page">
                <div className="ui grid segment">
                    <div className="one column row">
                       <div className="column">
                           <h3 className="text-center"><FormattedMessage id="app.welcome"/></h3>
                           <div id="welcome">Welcome</div>
                       </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){

        // this.context.store.dispatch(
        //     Notifications.success(notificationOpts)
        // );

        $('#welcome').html('Welcome Jquery - html() function works.')
    }
}

Welcome.contextTypes = {
    store: React.PropTypes.object
};
export default Welcome;