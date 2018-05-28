import React, {Component} from 'react';
import {connect} from 'react-redux';
import Draw from './pieces/Draw';
import InfiniteScroll from 'react-infinite-scroller';
import {fetchAllDraws} from '../../actions/KinoActions/kinoActions';
import moment from 'moment';
import {Loader, Divider, Input} from 'semantic-ui-react';
import {SingleDatePicker} from 'react-dates';
import ScrollButton from '../common/ScrollButton';

class AllGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreDraws: true,
            nextHref: null,
            allDraws: [],
            focused: false,
            date: null,
            selectedDate: null
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    resetList(selectedDate) {
        this.setState({
            hasMoreDraws: true,
            nextHref: null,
            allDraws: [],
            focuse: false,
        });
    }

    scrollUp() {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        if (top > 0) {
            window.scrollTo(0, top - 15);
            setTimeout(this.scrollUp, 10);
        }
    }

    getNextDraws() {

        var next_url = 'getAllDraws';
        var search_param = '';

        if (this.state.selectedDate != null) {
            // http://kinogrecia.dev/api/v1/getAllDraws?page=2
            search_param = '?search_date=' + this.state.selectedDate;
            next_url = next_url + search_param;
        }

        if (this.state.nextHref) {
            next_url = this.state.nextHref;
        }

        this.props.fetchAllDraws(next_url).then(
            res => {
                if (res.data.next_page_url) {
                    this.setState({
                        allDraws: this.state.allDraws.concat(res.data.data),
                        nextHref: res.data.next_page_url
                    })
                } else {
                    this.setState({
                        hasMoreDraws: false
                    });
                }
            },
            err => {
                console.log(err);
            })
    }

    componentWillMount() {
    }

    onDateChange(date) {
        let selectedDate = date.format('YYYY-MM-DD');
        this.setState({date, selectedDate: selectedDate});
        this.resetList(selectedDate);
    }

    onFocusChange({focused}) {
        this.setState({focused});
    }

    render() {

        const {allDraws, focused, date} = this.state;
        var drawColor = false;

        const draws = Object.keys(allDraws).map((draw) => {
            var drawTime = moment(allDraws[draw].draw_time).format('MMMM Do YYYY, h:mm A');
            drawColor = !drawColor;
            return (
                <Draw key={draw} drawTime={drawTime} drawResults={JSON.parse(allDraws[draw].results)} optionalClassNames='mobile-draw'
                      classStyle={drawColor} mixed={true}/>
            )
        });

        return (
            <div className="ui segment" style={{overflowY: "visible"}}>
                <h4 className="ui horizontal divider header">
                    All Games
                </h4>
                <div className="ui secondary segment horizontal">
                    <Input fluid placeholder='Search...'>
                        <SingleDatePicker
                            id="date_input"
                            date={date}
                            numberOfMonths={1}
                            isOutsideRange={(isOutsideRange) => false}
                            placeholder="Search draws by date"
                            focused={focused}
                            onDateChange={this.onDateChange}
                            onFocusChange={this.onFocusChange}
                        />
                    </Input>

                </div>

                <InfiniteScroll
                    pageStart={1}
                    loadMore={this.getNextDraws.bind(this)}
                    hasMore={this.state.hasMoreDraws}
                    loader={<div><Divider /><Loader active inline='centered'/></div>}>
                    <div className="draws">
                        {draws}
                    </div>
                </InfiniteScroll>

                <ScrollButton scrollStepInPx="100" delayInMs="5"/>
            </div>

        )
    }
}

AllGames.propTypes = {
    fetchAllDraws: React.PropTypes.func.isRequired,
}

export default connect(null, {fetchAllDraws})(AllGames);
