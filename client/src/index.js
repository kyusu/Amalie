import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import rootReducer from './reducers/index';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import PullRequestParticipants from './components/PullRequests/PullRequestParticipants';
import PullRequestsByAge from './components/PullRequests/PullRequestsByAge';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, middleware));
ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <div className="container">
                <div className="row">
                    <Route path="/" component={Header}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/pullrequestparticipants" component={PullRequestParticipants}/>
                    <Route path="/pullrequestsbyage" component={PullRequestsByAge}/>
                </div>
            </div>
            <div className="footer-wrapper">
                <div className="container">
                    <div className="row"><Footer/>
                    </div>
                </div>
            </div>
        </div>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
