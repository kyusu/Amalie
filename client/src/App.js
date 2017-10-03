import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

class App extends Component {
    render() {
        return (<div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Amalie</h2>
                <Link to="/login">Login</Link>
            </div>
        </div>);
    }
}

export default App;
