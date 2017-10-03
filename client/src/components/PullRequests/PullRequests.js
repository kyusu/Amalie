import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {pullRequests} from '../../actions/pullRequests.js';

class PullRequests extends Component {

    componentDidMount() {
        this.props.dispatch(pullRequests());
    }

    render() {
        const {pullRequests} = this.props;
        return (<div>
            {!pullRequests.value && !pullRequests.isFetching ? <Link to="/login">Please login</Link> : null}
            {pullRequests.value && !pullRequests.isFetching ? <div>{pullRequests.value[0].name}</div> : null}
            {pullRequests.error ? <div>{pullRequests.error}</div> : null}
        </div>);
    }
}

const mapStateToProps = ({pullRequests}) => ({pullRequests});

export default connect(mapStateToProps)(PullRequests);
