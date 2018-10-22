import createDeepstream from 'deepstream.io-client-js';
import React, { Component } from 'react';
import Events from "./components/Events"
import Record from "./components/Record"
import RPC from "./components/RPC"
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        value: '',
        connectionState: 'INITIAL'
        };

        this.ds = createDeepstream('0.0.0.0:6020/deepstream');

        this.ds.on('connectionStateChanged', this.handleConnectionState.bind(this));
        this.ds.on('error', error => console.error(error));

        this.client = this.ds.login();

        this.record = this.client.record.getRecord('test/johndoe');
        this.event = this.client.event;
        this.rpc = this.client.rpc;

        this.handleChange = this.handleChange.bind(this);

    }


    handleConnectionState( connectionState ){
        this.setState({connectionState: connectionState});
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        this.record.set('firstname', e.target.value);
    }

    render() {
        return (
        <div className="App">
                <div className="group connectionState">
                Connection-State is: <em id="connection-state">{this.state.connectionState}</em>
            </div>
            <Record record={this.record}></Record>
            <Events event={this.event}></Events>
            <RPC rpc={this.rpc}></RPC>
        </div>
        );
    }
}

export default App;
