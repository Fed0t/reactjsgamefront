import React, {Component} from 'react';
import {Button, Checkbox, Label, Input} from 'semantic-ui-react';
import classnames from 'classnames';
import validateRegister from '../../shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import {FormattedMessage} from 'react-intl';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
            errors: {},
            isLoading: '',
            invalid: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isValid() {
        const {errors, isValid} = validateRegister(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;

    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {

            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state).then(
                () => {

                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up succesefully.Check your email!'
                    });

                    this.context.router.push('/');
                    // browserHistory.push('/');

                },
                (data) => {
                    this.setState({errors: data.response.data, isLoading: false});
                }
            );

        }

    }

    onCheckTos(e) {
        this.setState({
            terms: !this.state.terms
        });
    }

    checkUserExists(e) {
        e.preventDefault();
        const field = e.target.name;
        const val = e.target.value;
        if (val !== '') {
            this.props.isUserExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;

                if (res.data.username || res.data.email) {
                    errors[field] = <FormattedMessage id="register.unique" values={{'field': field}}/>;
                    invalid = true;
                } else {
                    delete errors[field];
                    invalid = false;
                }

                this.setState({errors, invalid});

            });
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="">
                <form className="ui form text-center" onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        error={errors.username}
                        label="Choose your username"
                        onChange={this.onChange}
                        checkUserExists={this.checkUserExists}
                    />

                    <TextFieldGroup
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        error={errors.email}
                        label="Enter your email"
                        onChange={this.onChange}
                        checkUserExists={this.checkUserExists}
                    />

                    <TextFieldGroup
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        error={errors.password}
                        label="Enter your password"
                        type="password"
                        onChange={this.onChange}
                    />

                    <TextFieldGroup
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={this.state.password_confirmation}
                        error={errors.password_confirmation}
                        label="Confirm your password"
                        type="password"
                        onChange={this.onChange}
                    />

                    <div className={classnames("field", {"error": errors.terms})}>
                        <div className="ui checkbox">
                            <Checkbox toggle
                                      checked={this.state.terms}
                                      onChange={this.onCheckTos.bind(this)}
                                      label='I agree to the Terms and Conditions'/>
                            {errors.terms && <Label basic color="red" pointing="left">{errors.terms}</Label>}
                        </div>
                    </div>

                    <Button disabled={this.state.isLoading || this.state.invalid}
                            className={classnames("violet", {"loading": this.state.isLoading})}>
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignUpForm;