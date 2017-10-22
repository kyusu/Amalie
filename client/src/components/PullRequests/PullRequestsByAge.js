import React, {Component} from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import pullRequestsByAge from '../../actions/pullRequestsByAge';

class PullRequestsByAge extends Component {
    componentDidMount() {
        this.props.dispatch(pullRequestsByAge());
    }

    render() {
        const {pullRequestsByAge} = this.props;
        return (<div>
            {pullRequestsByAge.isFetching ? <div className="progress">
                <div className="indeterminate"/>
            </div> : null}
            {!pullRequestsByAge.value && !pullRequestsByAge.isFetching ? <Link to="/login">Please login</Link> : null}
            {pullRequestsByAge.error ? <div>{pullRequestsByAge.error}</div> : null}
            {pullRequestsByAge.value && !pullRequestsByAge.isFetching ? <ul className="collection">
                {R.map(
                    pullRequest => (
                        <li className="collection-item">{pullRequest.title}</li>
                    ),
                    pullRequestsByAge.value
                )}
            </ul> : null}
        </div>);
    }
}

const mapStateToProps = ({pullRequestsByAge}) => ({pullRequestsByAge});

export default connect(mapStateToProps)(PullRequestsByAge);
