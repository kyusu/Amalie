import React from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import {login} from '../../actions/login';


const getUserNameAndPassword = (acc, inputEl) => {
    acc[inputEl.id] = inputEl.value;
    return acc;
};

const isInput = node => node.tagName === 'INPUT';
const onlyInputs = R.filter(isInput);

const getFormValues = e => {
    const inputElements = onlyInputs(Array.from(e.target.elements));
    return R.reduce(getUserNameAndPassword, {}, inputElements);
};

const Login = ({login, onSubmit}) => (<div className="">
    {!login.isFetching && login.error ? <div>{login.error}</div> : null}
    {login.isFetching ? <div>Loading…</div> : null}
    {!login.isFetching ? <form onSubmit={onSubmit}>
        <label htmlFor="username">Username:
            <input id="username" type="text" placeholder="your username"/>
        </label>
        <label htmlFor="password">Password:
            <input id="password" type="password" placeholder="your password"/>
        </label>
        <label htmlFor="server">BitBucket server:
            <input id="server" type="text" placeholder="bitbucket.mycompay.com"/>
        </label>
        <button type="submit">Login</button>
    </form> : null}
</div>);

const mapDispatchToProps = dispatch => ({
    onSubmit: e => {
        e.preventDefault();
        dispatch(login(getFormValues(e)));
    }
});

const mapStateToProps = ({login}) => ({login});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
