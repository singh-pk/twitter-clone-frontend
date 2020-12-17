import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SingleComment from '../single-comment/SingleComment';

import { selectCurrentUserId } from '../../redux/user/userSelector';
import {
  selectRepliesByCommentId,
  selectCommentById,
  selectIsRepliesFetching,
} from '../../redux/comments/commentSelectors';

import { getRepliesByCommentIdStart } from '../../redux/comments/commentActions';

import './Comments.scss';

class Comments extends React.Component {
  state = {
    showReplies: false,
  };

  componentDidMount() {
    const { getRepliesByCommentIdStart, commentId, currentUserId } = this.props;
    getRepliesByCommentIdStart(commentId, currentUserId);
  }

  render() {
    const {
      postPageId,
      commentId,
      repliesByCommentId,
      comment,
      isRepliesFetching,
    } = this.props;
    return (
      <div>
        {isRepliesFetching ? (
          <div className='isloading-container'>
            <div className='isloading' />
          </div>
        ) : (
          <>
            <SingleComment
              postPageId={postPageId}
              comment={comment}
              hasReplies={
                repliesByCommentId && Object.keys(repliesByCommentId).length > 0
                  ? true
                  : false
              }
            />
            {repliesByCommentId &&
            Object.keys(repliesByCommentId).length > 0 ? (
              !this.state.showReplies ? (
                <div
                  className='show-replies'
                  onClick={() => this.setState({ showReplies: true })}>
                  <div>
                    <div />
                    <div />
                    <div />
                  </div>
                  <div>Show Replies</div>
                </div>
              ) : (
                repliesByCommentId &&
                Object.keys(repliesByCommentId).map((reply, i) => (
                  <SingleComment
                    key={reply}
                    reply={repliesByCommentId[reply]}
                    lastDiv={
                      i === Object.keys(repliesByCommentId).length - 1
                        ? true
                        : false
                    }
                    commentId={commentId}
                  />
                ))
              )
            ) : null}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    currentUserId: selectCurrentUserId,
    repliesByCommentId: selectRepliesByCommentId(ownProps.commentId),
    comment: selectCommentById(ownProps.commentId),
    isRepliesFetching: selectIsRepliesFetching,
  });

const mapDispatchToProps = (dispatch) => ({
  getRepliesByCommentIdStart: (commentId, userId) =>
    dispatch(getRepliesByCommentIdStart({ commentId, userId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
