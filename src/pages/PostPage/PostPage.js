import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Comments from '../../components/comments/Comments';

import { selectCurrentUserId } from '../../redux/user/userSelector';
import {
  selectComments,
  selectIsCommentsFetching,
} from '../../redux/comments/commentSelectors';

import { getCommentsByPostIdStart } from '../../redux/comments/commentActions';

class PostPage extends React.Component {
  componentDidMount() {
    const { getCommentsByPostIdStart, currentUserId, match } = this.props;
    getCommentsByPostIdStart(currentUserId, match.params.postId);
  }

  render() {
    console.log(this.props);
    const { match, isCommentsFetching, comments } = this.props;
    return (
      <div>
        <Header>
          <h3>Tweet</h3>
        </Header>
        <Posts postPageId={match.params.postId} />
        {isCommentsFetching ? (
          <div className='isloading-container'>
            <div className='isloading' />
          </div>
        ) : comments && Object.keys(comments).length > 0 ? (
          Object.keys(comments).map((comment) => (
            <Comments
              key={comment}
              postPageId={match.params.postId}
              commentId={comment}
            />
          ))
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
  comments: selectComments,
  isCommentsFetching: selectIsCommentsFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getCommentsByPostIdStart: (userId, postId) =>
    dispatch(getCommentsByPostIdStart({ userId, postId })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostPage)
);
