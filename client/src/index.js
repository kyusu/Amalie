import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Login from './components/Login/Login.js';
import PullRequests from './components/PullRequests/PullRequests.js';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/index.js';
import {Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, middleware));
ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <Route path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/pullrequests" component={PullRequests}/>
        </div>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
