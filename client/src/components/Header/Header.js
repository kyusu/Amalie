import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from '../../actions/logout.js';

const Header = ({login, onClick}) => (<div className="App-header">
    <h2>Amalie</h2>
    <h4>A BitBucket pull requests visualizer</h4>
    {!login.isFetching && login.isLoggedIn ? <button onClick={onClick}>Logout</button> : null}
    {!login.isFetching && !login.isLoggedIn ? <Link to="/login">Login</Link> : null}
</div>);

const mapStateToProps = ({login}) => ({login});

const mapDispatchToProps = dispatch => ({
    onClick: e => {
        e.preventDefault();
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
