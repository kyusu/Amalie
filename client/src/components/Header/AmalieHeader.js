import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {logout} from '../../actions/logout';

const {Header} = Layout;

const AmalieHeader = ({login, onClick}) => (<Header className="">
    <Link to="/" className="">Amalie</Link>
    {/*<ul id="" className="">
        {!login.isFetching && login.isLoggedIn ? <li>
            <a href="#" onClick={onClick}>Logout</a>
        </li> : null}
        {!login.isFetching && !login.isLoggedIn ? <li>
            <Link to="/login">Login</Link>
        </li> : null}
    </ul>*/}
</Header>);


const mapStateToProps = ({login}) => ({login});

const mapDispatchToProps = dispatch => ({
    onClick: e => {
        e.preventDefault();
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AmalieHeader);
