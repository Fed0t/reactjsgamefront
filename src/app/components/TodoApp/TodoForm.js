import React, {Component} from 'react';

export default class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            working: false
        }
    }

    render() {
        let loading = this.state.working ? 'loading' : '';
        return (
            <div>
                <div className="ui action input fluid">
                    <input type="text" placeholder="Add new..." value={this.state.body}
                           onChange={this.handleInputChange.bind(this)}/>
                    <button className={`ui button blue ${loading}`} onClick={this.handleClick.bind(this)}>
                        <i className="plus icon"></i> Create
                    </button>
                </div>
            </div>
        );
    }

    handleInputChange(event) {
        this.setState({body: event.target.value});
    }

    handleClick() {
        if (this.state.body.trim() == '') return;
        this.setState({working: true});

        let self = this,
            data = new FormData();

        data.append('body', self.state.body);

        fetch(API_URL + "/todos/store", {
            method: 'post',
            body: data
        }).then((response) => {
            response.json().then((jsonReponse) => {
                if (jsonReponse.success) {
                    self.props.onTodoStore(jsonReponse.todo); // call onTodoStore
                    self.setState({body: ''}); // empty our text input
                    this.setState({working: false});
                }
            })
        });
    }
}
