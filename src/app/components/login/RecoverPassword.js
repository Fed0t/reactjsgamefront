import React, {Component} from 'react';
import {addFlashMessage} from '../../actions/FlashMessages';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import TextFieldGroup from '../common/TextFieldGroup';
import classnames from 'classnames';
import {Button} from 'semantic-ui-react';
import {recoverPasswordRequest} from '../../actions/AuthActions';

class RecoverPassword extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            isLoading : false,
            errors: {}
        };
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        this.setState({
            errors: {},
            [e.target.name]: e.target.value,
            isLoading:true
        });

        this.props.recoverPasswordRequest(this.state)
            .then(
            (res) => {

                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Email was sent to reset your password!'
                });

                this.context.router.push('/');

            },
            (err) => {
                this.setState({errors: err.response.data, isLoading: false})
            });
    }


    render() {
        const {email,isLoading,errors} = this.state;
        return (
            <div className="">
                    <h2 className="text-center">Recover your password</h2>
                    <form className="ui large form" onSubmit={this.onSubmit.bind(this)}>
                        <div className="ui stacked segment">

                            <TextFieldGroup
                                name="email"
                                placeholder="Email"
                                value={email}
                                error={errors.email}
                                label="What is your email?"
                                onChange={this.onChange.bind(this)}
                            />

                            {/*<div className="ui  button" disabled={isLoading}>Login</div>*/}
                            <Button disabled={isLoading}
                                    className={classnames("fluid large violet submit", {"loading": isLoading})}>
                                Recover password
                            </Button>

                        </div>

                    </form>
                    <div className="text-center">
                        <Link onClick={this.props.recoverPassword} className="item"> Go back to login.</Link>
                    </div>
            </div>
        );
    }
}

RecoverPassword.propTypes = {
    addFlashMessage: React.PropTypes.func.isRequired,
    recoverPassword: React.PropTypes.func.isRequired,
    recoverPasswordRequest: React.PropTypes.func.isRequired,
}

RecoverPassword.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(null,{addFlashMessage,recoverPasswordRequest})(RecoverPassword);
