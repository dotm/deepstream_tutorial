import React, { Component } from 'react';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            eventsReceived: []
        };
        this.event = this.props.event;

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.event.subscribe('event-data', data => {
            this.setState({eventsReceived: [...this.state.eventsReceived, data]})
            this.setState({value: ''});
        });
    }

    handleClick(e) {
        this.event.emit('event-data', this.state.value);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return(
            <div className="group pubsub">
                <div className="half left">
                    <h2>Publish</h2>
                    <button className="half left" onClick={this.handleClick} >Send test-event with</button>
                    <input type="text" value={this.state.value} onChange={this.handleChange} className="half"/>
                </div>
                <div className="half">
                    <h2>Subscribe</h2>
                    <ul>
                        {
                            this.state.eventsReceived
                                .map(val => {
                                    return (
                                        <li key={this.state.eventsReceived.indexOf(val)} >Received event data: <em>{val}</em></li>
                                        );
                                })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Events