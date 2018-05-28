import React from 'react'
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Ball = ({active, number, identifier,classStyle}) => {

    const ball = (
        <div className={classStyle}>
            <ReactCSSTransitionGroup
                transitionName="fading"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <div className="numberCircle"><span className={classnames("", {"active": active})}>{number}</span></div>
            </ReactCSSTransitionGroup>
        </div>);

    return (
         ball
    )
}

export default Ball;