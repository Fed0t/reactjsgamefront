import React, {Component} from "react";
import {Link} from "react-router";
import {updateIntl} from 'react-intl-redux'
import {Menu} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {logout} from '../actions/AuthActions'

class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: '/'
        }

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, result) {
        e.preventDefault();
        const {name} = result;
        this.setState({activeItem: name});
        this.context.router.push(name);
    }

    componentDidMount() {
        this.setState({activeItem: this.context.router.location.pathname.substring(1)});
    }

    logoutUser(e){
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const {activeItem} = this.state;
        const {isAuthenticated} = this.props.auth;
        const userLinks = (
            <Menu.Menu position='right'>
                <a className="item" href="#" onClick={this.logoutUser.bind(this)}>Logout</a>
            </Menu.Menu>
        );

        const guestLinks = (
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={this.handleItemClick}>
                    Sign-in
                </Menu.Item>


            </Menu.Menu>
        );

        return (
            <Menu stackable pointing inverted>

                <Menu.Item
                    name='/'
                    onClick={this.handleItemClick}>
                    <img className="logo" src={require("../../assets/imagery/brand.png")}/>
                </Menu.Item>

                <Menu.Item
                    name='/'
                    active={activeItem === '/'}
                    onClick={this.handleItemClick}>
                    Kino
                </Menu.Item>

                <Menu.Item
                    name='/all-draws'
                    active={activeItem === '/all-draws'}
                    onClick={this.handleItemClick}>
                    All Draws
                </Menu.Item>


                <Menu.Item
                    name='/check-ticket'
                    active={activeItem === '/check-ticket'}
                    onClick={this.handleItemClick}>
                    Check ticket
                </Menu.Item>


                {isAuthenticated ? userLinks : guestLinks}
            </Menu>
        )
    }
}


MenuComponent.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

MenuComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps,{logout})(MenuComponent);