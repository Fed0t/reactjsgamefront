import React, {Component} from 'react';
import LoginForm from './LoginForm';
import RecoverPassword from './RecoverPassword';
import {addFlashMessage} from '../../actions/FlashMessages';
import {connect} from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRecovery: true,
        }

    }

    recoverPassword(e) {
        e.preventDefault(e);
        this.setState({
            showRecovery: !this.state.showRecovery
        })
    }

    render() {

        const {addFlashMessage} = this.props;

        let loginForm = ( <LoginForm
            addFlashMessage={addFlashMessage}
            recoverPassword={this.recoverPassword.bind(this)}
        />);

        let recoverPasswordForm = ( <RecoverPassword
            addFlashMessage={addFlashMessage}
            recoverPassword={this.recoverPassword.bind(this)}
        />);

        return (
            <div className="ui segment">
                <div className="ui text container">
                    {(this.state.showRecovery) ? loginForm : recoverPasswordForm}
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, {addFlashMessage})(Login);