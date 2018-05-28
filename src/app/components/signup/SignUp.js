import React, {Component} from 'react';
import SignUpForm from './SignUpForm';
import {connect} from 'react-redux';
import {userSignupRequest, isUserExists} from '../../actions/SignUpActions';
import {addFlashMessage} from '../../actions/FlashMessages';
import {FormattedMessage, FormattedNumber} from 'react-intl';

class SignUp extends Component {
    render() {
        const {userSignupRequest, addFlashMessage, isUserExists} = this.props;
        return (
            <div className="ui segment">
                <div className="ui text container">
                    <h2 className="text-center"><FormattedMessage id="app.sign-up"/></h2>
                    <SignUpForm
                        userSignupRequest={userSignupRequest}
                        addFlashMessage={addFlashMessage}
                        isUserExists={isUserExists}
                    />
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
};

export default connect(null, {userSignupRequest, addFlashMessage, isUserExists})(SignUp);