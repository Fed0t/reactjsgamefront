import React, {Component} from 'react';
import Ball from './pieces/Ball';
import LastNumbersList from './LastNumbersList';
import {fetchLastFiveDraws} from '../../actions/KinoActions/kinoActions';
import {connect} from 'react-redux';
import {Checkbox} from 'semantic-ui-react';
import cookie from 'react-cookie';

class GameBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            extractedNumbers: [],
            listItems: {},
            gameMode: cookie.load('acceptCookies'),
            remainingTimeToNextDraw: '',
        };
        this.buildGameBoard = this.buildGameBoard.bind(this);
        this.getTimeRemaining = this.getTimeRemaining.bind(this);

    }

    buildGameBoard() {
        const items = {};
        var j = 0;

        for (var i = 1; i <= 80; i++) {
            j = i;
            if (j <= 9) j = "0" + j;
            items[i] = {id: i, text: j, active: false};
        }
        this.setState({
            listItems: items,
        });
    }


    componentWillMount() {
        var today = new Date().getHours();
        if (today >= 7 && today <= 22) {
            var intervalId = setInterval(this.getTimeRemaining, 800);
            this.setState({intervalId: intervalId});
        }
        this.props.fetchLastFiveDraws().then(res => {
            this.buildGameBoard();
            this.updateGameBoard();
        });
    }

    resetGameBoard(){
        const {listItems} = this.state;
        for (var k in listItems) {
            listItems[k].active = false;
        }
    }

    updateGameBoard() {
        const {lastFiveDraws} = this.props;
        const {listItems,gameMode} = this.state;
        this.resetGameBoard();

        if (lastFiveDraws[0].results) {
            var that = this;
            JSON.parse(lastFiveDraws[0].results).forEach(function (number, index) {
                if (gameMode == true && that.state.remainingTimeToNextDraw.length > 0) {
                    setTimeout(function () {
                        listItems[number].active = true;
                    }, index * 1500);
                } else {
                    listItems[number].active = true;
                }
            })
            this.setState({
                listItems:listItems
            })
        }


    }

    componentWillReceiveProps(nextProps) {
        var that = this;
        setTimeout(function () {
            that.updateGameBoard();
        }, 1000);
    }

    getTimeRemaining() {
        var d = new Date();

        //convet current mm:ss to seconds for easier caculation, we don't care hours.
        var seconds = d.getMinutes() * 60 + d.getSeconds() - 70;
        var fiveMin = 60 * 5; //five minutes is 300 seconds!

        //let's say now is 01:30,then current seconds is 60+30 = 90. And 90%300 = 90,
        // finally 300-90 = 210.That's the time left!

        var timeleft = fiveMin - seconds % fiveMin;
        var timer = parseInt(timeleft / 60) + ':' + timeleft % 60; //formart seconds back into mm:ss
        this.setState({
            remainingTimeToNextDraw: timer
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);

    }

    toggleAnimation(event,data) {
        this.setState({
            gameMode: data.checked
        });
        if(data.checked == false){
            cookie.remove('gameMode', {path: '/'});
        }else{
            cookie.save('gameMode', data.checked, {path: '/'});
        }
    }

    render() {

        const {listItems, remainingTimeToNextDraw ,gameMode} = this.state;
        const boardBalls = Object.keys(listItems).map((ballId) => {
            return (
                <Ball
                    key={listItems[ballId].id}
                    number={listItems[ballId].text}
                    active={listItems[ballId].active}
                    classStyle="column"
                />
            )
        });

        return (

            <div className="ui grid  stackable segment">
                <div className="row">
                    <div className="ten wide column row">
                        <div className="ui horizontal segment">

                            <div className="text-center ui header">
                                <Checkbox toggle
                                          className={"left"}
                                          label={"Slow"}
                                          defaultChecked={gameMode}
                                          onChange={this.toggleAnimation.bind(this)}
                                />
                                {(!remainingTimeToNextDraw ?
                                    (<div className="">Game ends</div>) :
                                    (<div className="">Next game: {remainingTimeToNextDraw}</div>) )}
                            </div>
                        </div> 

                        <div className="ui grid segment ">
                            <div className="eight column row text-center mobile-margin-right">
                                {boardBalls}
                            </div>
                        </div>
                    </div>

                    <div className="six wide column row">
                        <div className="ui grid">
                            <div className="one column ">
                                <div className="ui horizontal segment">
                                    <h3 className="text-center">
                                        Last draws
                                    </h3>
                                </div>
                                <div className="ui segment">
                                    <LastNumbersList/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GameBoard.PropTypes = {
    fetchLastFiveDraws: React.PropTypes.func.isRequired,
    lastFiveDraws: React.PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    return {
        lastFiveDraws: state.kino.lastFiveDraws,
    }
}

export default connect(mapStateToProps, {fetchLastFiveDraws})(GameBoard);


