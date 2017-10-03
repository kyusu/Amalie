import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from '../../actions/logout.js';

const Header = ({login, onClick}) => (<nav className="pink">
    <div className="nav-wrapper">
        <div className="col s12">
            <a href="#" className="brand-logo">Amalie</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {!login.isFetching && login.isLoggedIn ? <li>
                    <a href="#" onClick={onClick}>Logout</a>
                </li> : null}
                {!login.isFetching && !login.isLoggedIn ? <li>
                    <Link to="/login">Login</Link>
                </li> : null}
            </ul>
        </div>
    </div>
</nav>);

const mapStateToProps = ({login}) => ({login});

const mapDispatchToProps = dispatch => ({
    onClick: e => {
        e.preventDefault();
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
