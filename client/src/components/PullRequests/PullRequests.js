import React, {Component} from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {pullRequests} from '../../actions/pullRequests';

class PullRequests extends Component {
    componentDidMount() {
        this.props.dispatch(pullRequests());
    }

    render() {
        const {pullRequests} = this.props;
        return (<div>
            {pullRequests.isFetching ? <div className="progress">
                <div className="indeterminate"/>
            </div> : null}
            {!pullRequests.value && !pullRequests.isFetching ? <Link to="/login">Please login</Link> : null}
            {pullRequests.error ? <div>{pullRequests.error}</div> : null}
            {pullRequests.value && !pullRequests.isFetching ? <ul className="collection">
                {R.map(participant => (<li className="collection-item">{participant.name}
                    <span
                        className="new badge red"
                        data-badge-caption="to review">{participant.pullRequestsToReview.length}</span>
                    {participant.pullRequestsAuthored ? <span
                        className="new badge blue"
                        data-badge-caption="authored">
                        {participant.pullRequestsAuthored.length}</span> : null}
                </li>), pullRequests.value)}
            </ul> : null}
        </div>);
    }
}

const mapStateToProps = ({pullRequests}) => ({pullRequests});

export default connect(mapStateToProps)(PullRequests);
