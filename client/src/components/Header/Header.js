import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/logout';

const Header = ({login, onClick}) => (<nav className="">
    <div className="">
        <div className="">
            <Link to="/" className="">Amalie</Link>
            <ul id="" className="">
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
