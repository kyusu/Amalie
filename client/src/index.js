import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {Layout} from 'antd';
import rootReducer from './reducers/index';
import AmalieHeader from './components/Header/AmalieHeader';
import AmalieFooter from './components/Footer/AmalieFooter';
import Login from './components/Login/Login';
import PullRequestParticipants from './components/PullRequests/PullRequestParticipants';
import PullRequestsByAge from './components/PullRequests/PullRequestsByAge';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const {Content} = Layout;
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, middleware));
ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Layout>
            <AmalieHeader/>
            <Content>
                <Route path="/login" component={Login}/>
                <Route path="/pullrequestparticipants" component={PullRequestParticipants}/>
                <Route path="/pullrequestsbyage" component={PullRequestsByAge}/>
            </Content>
            <AmalieFooter/>
        </Layout>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
