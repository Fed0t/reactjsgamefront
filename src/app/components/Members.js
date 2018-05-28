import React, { Component } from 'react';
import UserList from '../containers/UserList';
import UserDetail from '../containers/UserDetail';

export default class Members extends Component {
    render() {
        return (
            <div className="ui grid">
                <div className="column">
                    <h2>Users List:</h2>
                    <UserList/>
                    <hr/>
                    <h2>User Details:</h2>
                    <UserDetail/>
                </div>
            </div>
        );
    }
}