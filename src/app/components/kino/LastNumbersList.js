import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchLastFiveDraws} from '../../actions/KinoActions/kinoActions';
import LastNumbers from './LastNumbers';
import moment from 'moment';

class LastNumbersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastFiveDraws: {}
        };
    }

    render() {
        const {lastFiveDraws} = this.props;
        var drawColor = false;
        const boardBalls = Object.keys(lastFiveDraws).map((draw) => {
            drawColor = !drawColor;
            return (
                <LastNumbers key={draw}
                             drawNumbers={JSON.parse(lastFiveDraws[draw].results)}
                             drawTime={moment(lastFiveDraws[draw].draw_time).format('LT')}
                             classStyle={drawColor}
                             mixed={true}
                />
            )
        });
        return (
            <div className="">
                {boardBalls}
            </div>
        )
    }
}

LastNumbersList.propTypes = {
    lastFiveDraws: React.PropTypes.array,
    drawTime: React.PropTypes.string,
}

function mapStateToProps(state) {
    return {
        lastFiveDraws: state.kino.lastFiveDraws,
    }
}


export default connect(mapStateToProps, {})(LastNumbersList);