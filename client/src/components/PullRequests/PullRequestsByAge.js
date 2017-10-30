import React, {Component} from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withSafeInterval} from '@hocs/safe-timers';
import {compose} from 'recompose';
import {Spin, Card, Col, Row, Alert} from 'antd';
import moment from 'moment';
import pullRequestsByAge from '../../actions/pullRequestsByAge';

class PullRequestsByAge extends Component {

    static classifyPullRequest(createdDate) {
        const pullRequestDate = moment(createdDate);
        const now = moment();
        const differenceInDays = now.diff(pullRequestDate, 'days');
        let type;
        if (differenceInDays < 1) {
            type = 'success';
        } else if (differenceInDays < 3) {
            type = 'info';
        } else if (differenceInDays < 5) {
            type = 'warning';
        } else {
            type = 'error';
        }
        return type;
    }

    static renderCard(pullRequest) {
        return (
            <Col span={8} xs={24} sm={18} md={10} lg={8} xl={4} key={pullRequest.id}>
                <Card
                    title={<Alert
                        message={`${new Date(pullRequest.createdDate).toLocaleDateString()} - ${pullRequest.repo}`}
                        type={PullRequestsByAge.classifyPullRequest(pullRequest.createdDate)}
                        showIcon
                    />}
                >
                    <p>
                        {pullRequest.title}
                    </p>
                </Card>
            </Col>
        );
    }

    componentDidMount() {
        this.fetchData();
        this.props.setSafeInterval(this.fetchData.bind(this), 3 * 60 * 1000);
    }

    fetchData() {
        this.props.dispatch(pullRequestsByAge());
    }

    render() {
        const {pullRequestsByAge} = this.props;
        return (<div className="pull-requests-by-age">
            {pullRequestsByAge.isFetching ?
                <Row>/
                    <Col span={24} className="row-spin">
                        <Spin size="large"/>
                    </Col>
                </Row> : null}
            {!pullRequestsByAge.value && !pullRequestsByAge.isFetching ? <Link to="/login">Please login</Link> : null}
            {pullRequestsByAge.error ? <div>{pullRequestsByAge.error}</div> : null}
            {pullRequestsByAge.value && !pullRequestsByAge.isFetching ?
                <Row gutter={8} type="flex" justify="center" align="top">
                    {R.map(PullRequestsByAge.renderCard, pullRequestsByAge.value)}
                </Row> : null}
        </div>);
    }
}

const mapStateToProps = ({pullRequestsByAge}) => ({pullRequestsByAge});

export default compose(
    withSafeInterval,
    connect(mapStateToProps)
)(PullRequestsByAge);
