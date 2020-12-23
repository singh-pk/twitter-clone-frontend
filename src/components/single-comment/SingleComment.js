import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as ReplyButton } from '../icons/reply-button.svg';
import { ReactComponent as HeartButton } from '../icons/heart-icon.svg';
import { ReactComponent as HeartButtonLiked } from '../icons/heart-icon-liked.svg';
import DefaultImage from '../icons/default_img.jfif';

import {
  selectPostByIdPostedById,
  selectPostByIdPostedByName,
} from '../../redux/post/postSelectors';
import {
  selectUserLikes,
  selectCurrentUserId,
} from '../../redux/user/userSelector';

import {
  replyLikeStart,
  replyUnlikeStart,
  commentLikeStart,
  commentUnlikeStart,
} from '../../redux/user/userActions';

import './SingleComment.scss';

class SingleComment extends React.Component {
  render() {
    console.log(this.props);
    const {
      postedById,
      postPageId,
      postedByName,
      hasReplies,
      lastDiv,
      comment,
      reply,
      post,
      userLikes,
      currentUserId,
      commentLikeStart,
      commentUnlikeStart,
      replyLikeStart,
      replyUnlikeStart,
    } = this.props;
    return (
      <div
        className={`comments ${
          (hasReplies === false || lastDiv === true) && 'borderBottom'
        }`}>
        <div>
          <div className='comment-user-pic'>
            <img
              src={`https://tweaker-twitter.herokuapp.com/api/user/photo/${DefaultImage}?${new Date().getTime()}`}
              onError={(i) => (i.target.src = DefaultImage)}
              alt=''
            />
          </div>
          {(hasReplies === true || lastDiv === false) && (
            <div className='side-line' />
          )}
        </div>
        <div>
          <div>
            <div onClick={(e) => e.stopPropagation()}>
              <h4>
                <Link
                  to={`/${
                    (comment && comment.commentedBy._id) ||
                    (reply && reply.repliedBy._id) ||
                    post.postedBy._id
                  }`}>
                  {(comment && comment.commentedBy.name) ||
                    (reply && reply.repliedBy.name) ||
                    post.postedBy.name}
                </Link>
              </h4>
              <span>
                @
                {(comment && comment.commentedBy.name.split(' ').join('')) ||
                  (reply && reply.repliedBy.name.split(' ').join('')) ||
                  post.postedBy.name.split(' ').join('')}
              </span>
            </div>
            <span>Replying to </span>{' '}
            <Link to={`/${postedById}`}>
              @{postedByName && postedByName.split(' ').join('')}
            </Link>
            <div>
              {(comment && comment.comment) ||
                (reply && reply.reply) ||
                post.body}
            </div>
          </div>
          <div>
            {!post && (
              <>
                <div>
                  <ReplyButton className='post-buttons' />
                </div>
                <div
                  onClick={
                    comment
                      ? userLikes.includes(comment._id)
                        ? (event) => {
                            event.stopPropagation();
                            commentUnlikeStart(
                              postPageId,
                              comment._id,
                              currentUserId
                            );
                          }
                        : (event) => {
                            event.stopPropagation();
                            commentLikeStart(
                              postPageId,
                              comment._id,
                              currentUserId
                            );
                          }
                      : reply
                      ? userLikes.includes(reply._id)
                        ? (event) => {
                            event.stopPropagation();
                            replyUnlikeStart(
                              reply.commentId,
                              reply._id,
                              currentUserId
                            );
                          }
                        : (event) => {
                            event.stopPropagation();
                            replyLikeStart(
                              reply.commentId,
                              reply._id,
                              currentUserId
                            );
                          }
                      : null
                  }>
                  {userLikes.includes((comment && comment._id) || reply._id) ? (
                    <div>
                      <HeartButtonLiked className='post-buttons liked' />
                    </div>
                  ) : (
                    <div>
                      <HeartButton className='post-buttons' />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    postedByName: selectPostByIdPostedByName(ownProps.postPageId),
    postedById: selectPostByIdPostedById(ownProps.postPageId),
    userLikes: selectUserLikes,
    currentUserId: selectCurrentUserId,
  });

const mapDispatchToProps = (dispatch) => ({
  commentLikeStart: (postId, commentId, userId) =>
    dispatch(commentLikeStart({ postId, commentId, userId })),
  commentUnlikeStart: (postId, commentId, userId) =>
    dispatch(commentUnlikeStart({ postId, commentId, userId })),
  replyLikeStart: (commentId, replyId, userId) =>
    dispatch(replyLikeStart({ commentId, replyId, userId })),
  replyUnlikeStart: (commentId, replyId, userId) =>
    dispatch(replyUnlikeStart({ commentId, replyId, userId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);
