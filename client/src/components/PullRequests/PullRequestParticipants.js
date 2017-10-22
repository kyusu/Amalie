import React, {Component} from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withSafeInterval} from '@hocs/safe-timers';
import {compose} from 'recompose';
import pullRequestParticipants from '../../actions/pullRequestParticipants';

class PullRequestParticipants extends Component {
    componentDidMount() {
        this.fetchData();
        this.props.setSafeInterval(this.fetchData.bind(this), 3 * 60 * 1000);
    }

    fetchData() {
        this.props.dispatch(pullRequestParticipants());
    }

    render() {
        const {pullRequestParticipants} = this.props;
        return (<div>
            {pullRequestParticipants.isFetching ? <div className="progress">
                <div className="indeterminate"/>
            </div> : null}
            {!pullRequestParticipants.value && !pullRequestParticipants.isFetching ? <Link to="/login">Please login</Link> : null}
            {pullRequestParticipants.error ? <div>{pullRequestParticipants.error}</div> : null}
            {pullRequestParticipants.value && !pullRequestParticipants.isFetching ? <ul className="collection">
                {R.map(participant => (<li key={participant.name} className="collection-item">{participant.name}
                    <span
                        className="new badge red"
                        data-badge-caption="to review">{participant.pullRequestsToReview.length}</span>
                    {participant.pullRequestsAuthored ? <span
                        className="new badge blue"
                        data-badge-caption="authored">
                        {participant.pullRequestsAuthored.length}</span> : null}
                </li>), pullRequestParticipants.value)}
            </ul> : null}
        </div>);
    }
}

const mapStateToProps = ({pullRequestParticipants}) => ({pullRequestParticipants});

export default compose(
    withSafeInterval,
    connect(mapStateToProps)
)(PullRequestParticipants);
