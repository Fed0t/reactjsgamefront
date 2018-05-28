import React, {Component} from 'react';
import {connect} from 'react-redux';
import Ball from './pieces/Ball';
import Draw from './pieces/Draw';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LastNumbers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {drawNumbers, drawTime , classStyle,mixed} = this.props;
        return (
            <Draw drawTime={drawTime} drawResults={drawNumbers} optionalClassNames="small-draw" classStyle={classStyle} mixed={mixed}/>
        )
    }
}

LastNumbers.propTypes = {
    drawNumbers: React.PropTypes.array.isRequired,
    drawTime: React.PropTypes.string.isRequired
}


export default LastNumbers;
