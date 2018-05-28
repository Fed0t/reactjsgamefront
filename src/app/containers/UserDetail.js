import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component {

    render() {
        if(!this.props.user){
            return (<h3>Select a user</h3>);
        }
        return (
            <div>
                <img src={this.props.user.thumbnail} alt=""/>
                <h2>FirstName: {this.props.user.first}</h2>
                <h3>Age: {this.props.user.age}</h3>
                <h3>Description: {this.props.user.description}</h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser
    }
}

export default connect(mapStateToProps)(UserDetail);