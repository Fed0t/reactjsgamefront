import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import Ball from './pieces/Ball';

class CheckTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketPhoto:'',
            imagePreviewUrl:'',
            ticketNumbers: [],
        }
    }

    submitPhoto(e){
        e.preventDefault();
        var data = new FormData();
        data.append('ticketPhoto', this.state.ticketPhoto);
        console.log('Handle uploading',data);

        var config = {
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            }
        };
        var that = this;
        axios.post(API_URL+'/checkTicketPhoto', data, config)
            .then(function (res) {
                that.setState({
                    ticketNumbers:res.data[0]
                })
            })
            .catch(function (err) {

            });
    };


    onChangeImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                ticketPhoto: file,
                imagePreviewUrl: reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    render() {

        let {imagePreviewUrl,ticketNumbers} = this.state;
        let imagePreview = null;
        if(imagePreviewUrl){
            imagePreview = (<img src={imagePreviewUrl}/>)
        }else{
            imagePreview = (<div>No image selected for preview.</div>)
        }

        console.log(ticketNumbers);
        //
        const numbersResults = ticketNumbers.map(ticketNumber =>
            <Ball
                key={ticketNumber}
                number={ticketNumber}
                classStyle={' mobile-draw blue-balls' + " column"}
            />
        );



        return (
            <div className="ui segment">
                <h1>Check your ticket</h1>
                <form className="ui form " onSubmit={(e) => this.submitPhoto(e)}>
                    <div className="field">

                        <label htmlFor="ticket" className="ui icon button blue ticket-label">
                            <i className="photo icon"> </i>
                               Select ticket
                        </label>
                        <input type="file" id="ticket" name="ticketPhoto" onChange={(e) => this.onChangeImage(e)} capture="camera" style={{'display':'none'}}/>

                    </div>
                    <div className="segment ui">
                        <div className="ui image large">
                            {imagePreview}
                        </div>
                    </div>

                    <div className="segment ui grid ten column">
                        {numbersResults}
                    </div>

                    <div className="text-center">
                        <button className="ui button violet" type="submit">Check numbers</button>

                    </div>
                </form>


            </div>
        )
    }
}

CheckTicket.propTypes = {
}


export default CheckTicket;
