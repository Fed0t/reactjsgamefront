import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import {Button, Message, Checkbox} from 'semantic-ui-react';
import classnames from 'classnames';
import validateInput from '../../shared/validations/login';
import {connect} from 'react-redux';
import {login} from '../../actions/AuthActions';
import {Link} from 'react-router';
import $ from 'jquery';


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({
                errors
            });
        }
        return isValid;
    }

    onCheckRemember(e) {
        e.preventDefault();
        this.setState({
            remember: !this.state.remember
        })
    }


    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({
                errors: {},
                isLoading: true
            });
            this.props.login(this.state).then(
                () => {

                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You logged in successfully.!'
                    });

                    this.context.router.push('/');

                },
                (err) => {
                    this.setState({errors: err.response.data, isLoading: false})
                }
            );
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onBlur(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        const {errors, username, password, isLoading} = this.state;
        return (
            <div className="">
                <form className="ui form" onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        name="username"
                        placeholder="Username"
                        value={username}
                        error={errors.username}
                        label="Type your username"
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                    />

                    <TextFieldGroup
                        name="password"
                        placeholder="Password"
                        value={password}
                        type="password"
                        error={errors.password}
                        label="Type your password"
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                    />

                    <div className="ui segment">
                        <div className="field ">
                            <div className="ui toggle checkbox">
                                <Checkbox toggle
                                          checked={this.state.remember}
                                          onChange={this.onCheckRemember.bind(this)}
                                          label='Remember'/>

                            </div>
                            <Link onClick={this.props.recoverPassword} className="item right">Forget?</Link>
                        </div>
                    </div>
                    {errors.message && <Message size='small' color='red'>{errors.message}</Message>}

                    {/*<div className="ui  button" disabled={isLoading}>Login</div>*/}
                    <Button disabled={isLoading}
                            className={classnames("fluid large violet submit", {"loading": isLoading})}>
                        Login
                    </Button>

                    <div className="ui error message"></div>

                </form>
                <div className="ui message text-center">
                    New to us?
                    <Link to="/sign-up" className="item"> Sign Up</Link>
                </div>
            </div>
        );
    }
}


LoginForm.PropTypes = {
    login: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    recoverPassword: React.PropTypes.func.isRequired

}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, {login})(LoginForm);