import React, { Component } from 'react';

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: ''
        };

        this.record = this.props.record;

        this.record.subscribe(value => {
            this.setState({firstname: value.firstname});
            this.setState({lastname: value.lastname});
        });
    }

    handleChange = (e) => {
        if(e.target.id === 'firstname'){
            this.setState({firstname: e.target.value});
            this.record.set('firstname', e.target.value);
        } else if(e.target.id === 'lastname'){
            this.setState({lastname: e.target.value});
            this.record.set('lastname', e.target.value);
        }
    }

    render() {
        return(
            <div className="group realtimedb">
                <h2>Realtime Datastore</h2>
                <div className="input-group half left">
                    <label>Firstname</label>
                    <input type="text" value={this.state.firstname} onChange={this.handleChange} id="firstname"/>
                </div>
                <div className="input-group half">
                    <label>Lastname</label>
                    <input type="text" value={this.state.lastname} onChange={this.handleChange} id="lastname"/>
                </div>
            </div>
        );
    }
}

export default Record