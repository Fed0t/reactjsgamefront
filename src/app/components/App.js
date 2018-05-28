import React from 'react';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux';
import {setCurrentNumbers} from '../actions/KinoActions/kinoActions';
import MenuComponent from './MenuComponent';
import FlashMessagesList from './flash/FlashMessagesList';
import '../shared/custom';
import Notifications from 'react-notification-system-redux';
import {Message} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import cookie from 'react-cookie';
import moment from 'moment';

const notificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: 'Good Luck',
    message: 'The draw was made.Check the <strong>board</strong>',
    position: 'tr',
    level: 'success',
    dismissible: true,
    autoDismiss: 10,
    // action: {
    //     label: 'Click me!!',
    //     callback: () => alert('clicked!')
    // }
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wsChannels: ['KinoLive'],
            wsConnection: {},
            acceptCookies: cookie.load('acceptCookies')
        }

        this.wsSubscribe = this.wsSubscribe.bind(this);
    }

    wsConnect() {
        var that = this;

        var websiteHostname = location.protocol + '//' + window.location.hostname;
        var hostName = ('localhost' == location.hostname ? 'kinogrecia.dev' : 'kinogrecia.com');
        var websocketPort = ('https:' == location.protocol ? ':9099' : ':9090');
        var websocketProtocol = ('https:' == location.protocol ? 'wss://' : 'ws://');
        var websocketServer = websocketProtocol + hostName + websocketPort;

        ab.connect(websocketServer,
            function onOpen(session) {
                // console.log('%c Websocket Connected! ', 'background: #222; color: #bada55');
                that.setState({
                    wsConnection: session
                });
                that.wsSubscribe(that.state.wsChannels[0], session);
            },
            function onClose(code, reason) {
                console.log("Session has gone: " + code + " - Reason " + reason);
                that.setState({
                    wsConnection: {}
                });
            },
            {
                'maxRetries': 20,
                'retryDelay': 10000
            }
        );

        // ab.launch(
        //     {
        //         // Tavendo WebMQ server URL
        //         wsuri: websocketServer,
        //         // authentication info
        //         appkey: null, // authenticate as anonymous
        //         appsecret: null,
        //         appextra: null,
        //         // additional session configuration
        //         sessionConfig: {
        //             maxRetries: 10,
        //             sessionIdent: "Vote"
        //         }
        //     },
        //     function (newSession) {
        //         that.setState({
        //             wsConnection: newSession
        //         });
        //
        //         newSession.wsSubscribe(that.state.wsChannels[0], newSession);
        //     },
        //
        //     function (code, reason, detail) {
        //         console.log(code,reason,detail);
        //         that.setState({
        //             wsConnection: null
        //         });
        //     }
        // );
        //

    }

    wsSubscribe(channel, wsConnection) {
        var that = this;
        if (!isEmpty(wsConnection)) {
            wsConnection.subscribe(channel, function (channel, response) {
                if (channel == 'KinoLive') {
                    that.context.store.dispatch(
                        Notifications.success(notificationOpts)
                    );
                    const event = JSON.parse(response);
                    that.context.store.dispatch(setCurrentNumbers(event.data.message));
                }
            });
        }
    }

    componentWillMount() {
        this.wsConnect();
    }

    //exemplu subscribe dinamic
    componentDidMount() {
        // const that = this;
        // setTimeout(function () {
        //     that.state.wsChannels.push('Comments987283');
        //     that.setState({
        //         wsChannels: that.state.wsChannels
        //     });
        // }, 5000);


    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.wsChannels.length > 1) {
            nextState.wsChannels.forEach(function (value) {

            });
        }
    }

    acceptCookie(e, data) {
        e.preventDefault();
        this.setState({acceptCookies: true});
        cookie.save('acceptCookies', true, {path: '/'});

    }


    render() {
        const {notifications} = this.props;
        const style = {
            NotificationItem: {
                DefaultStyle: {
                    margin: '10px 5px 2px 1px'
                },

                success: {
                    color: 'black'
                }
            },
        };

        let acceptCookie = '';

        if (!this.state.acceptCookies) {
            acceptCookie = (
                <Message color='black' onDismiss={this.acceptCookie.bind(this)}>
                    <FormattedMessage id="app.cookieAgree"/>
                </Message>
            );
        }

        return (
            <div className="kino">

                <div className="ui container page main gamebox">
                    {acceptCookie}
                    <Notifications
                        notifications={notifications}
                        style={style}
                        allowHTML={true}
                    />
                    <MenuComponent/>
                    <FlashMessagesList />
                    {this.props.children}

                    <div className="ui inverted segment form-page">
                        <div className="ui container">
                            <div className="text-center">
                                KinoGreciaCom - Copyright {moment().format('LL')} . All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

App.contextTypes = {
    store: React.PropTypes.object,
};

App.propTypes = {
    notifications: React.PropTypes.array,
    extractedNumbers: React.PropTypes.array
};

export default connect(state => ({
    notifications: state.notifications,
    extractedNumbers: state.kino.extractedNumbers
}))(App);