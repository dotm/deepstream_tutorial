import React, { Component } from 'react';

class RPC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestValue: '3',
            responseValue: '7',
            displayResponse: '-'
        };
        this.rpc = this.props.rpc;

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // Register as a provider for multiply-number
        this.rpc.provide('multiply-number', function( data, response ){
            // respond to the request by multiplying the incoming number
            // with the one from the response input
            response.send(data.value * parseFloat(this.state.responseValue));
        }.bind(this));
    }

    handleClick(e) {
        // read the value from the input field
        // and convert it into a number
        var data = {
            value: parseFloat(this.state.requestValue)
        };

        // Make a request for `multiply-number` with our data object
        // and wait for the response
        this.rpc.make('multiply-number', data, function( err, resp ){

            //display the response (or an error)
            this.setState({displayResponse: resp || err.toString()});
        }.bind(this));
    }

    handleChange(e) {
            if(e.target.id === 'request-value'){
            this.setState({requestValue: e.target.value});
        } else if(e.target.id === 'response-value'){
            this.setState({responseValue: e.target.value});
        }
    }

    render() {
        return(
                <div className="group reqres">
                    <div className="half left">
                        <h2>Request</h2>
                        <button className="half left" id="make-rpc" onClick={this.handleClick}>Make multiply request</button>
                        <div className="half">
                            <input type="text" id="request-value" className="half left"
                            value={this.state.requestValue} onChange={this.handleChange}/>
                            <span className="response half item" id="display-response">
                                {this.state.displayResponse}
                            </span>
                        </div>
                    </div>
                    <div className="half">
                        <h2>Response</h2>
                        <div className="half left item">Multiply number with:</div>
                        <input type="text" className="half" id="response-value" 
                        value={this.state.responseValue} onChange={this.handleChange} />
                    </div>
                </div>
        );
    }
}

export default RPC