import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

const PullRequests = props => (<div>
    {!props.login.value && !props.login.isFetching ? <Link to="/login">Please login</Link> : null}
    {props.login.value && !props.login.isFetching ? <div>{props.login.value.name}</div> : null}
    {props.login.error ? <div>An error has occurred</div> : null}
</div>);

const mapStateToProps = ({login}) => ({login});

export default connect(mapStateToProps)(PullRequests);
