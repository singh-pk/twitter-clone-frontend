import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as ReplyButton } from '../icons/reply-button.svg';
import { ReactComponent as HeartButton } from '../icons/heart-icon.svg';
import { ReactComponent as HeartButtonLiked } from '../icons/heart-icon-liked.svg';
import DefaultImage from '../icons/default_img.jfif';
// import CreateCommentModal from '../createCommentModal/CreateCommentModal';

import {
  selectPosts,
  selectIsPostFetching,
  selectIsPostByIdFetching,
} from '../../redux/post/postSelectors';
import {
  selectCurrentUserId,
  selectUserLikes,
} from '../../redux/user/userSelector';

import {
  getPostByUserStart,
  getPostByFollowingStart,
  getPostByIdStart,
} from '../../redux/post/postActions';
import { likePostStart, unlikePostStart } from '../../redux/user/userActions';

import './Posts.scss';

class Posts extends React.Component {
  componentDidMount() {
    const {
      postPageId,
      getPostByIdStart,
      userProfileId,
      getPostByUserStart,
      currentUserId,
      getPostByFollowingStart,
    } = this.props;
    (postPageId && getPostByIdStart(postPageId)) ||
      (userProfileId && getPostByUserStart(userProfileId)) ||
      getPostByFollowingStart(currentUserId);
  }

  render() {
    const {
      posts,
      likePostStart,
      unlikePostStart,
      currentUserId,
      userLikes,
      isPostFetching,
      isPostByIdFetching,
      history,
      postPageId,
    } = this.props;
    return (postPageId ? isPostByIdFetching : isPostFetching) ? (
      <div className='isloading-container'>
        <div className='isloading' />
      </div>
    ) : (
      <>
        {Object.keys(posts).length > 0 ? (
          Object.keys(posts).map((post) => {
            return (
              <React.Fragment key={post}>
                <div
                  className={`${postPageId && 'post-page-posts'} posts`}
                  onClick={() =>
                    history.push(`/${posts[post].postedBy.name}/${post}`)
                  }>
                  <div className='post-user-pic'>
                    <img
                      src={`https://tweaker-twitter.herokuapp.com/api/user/photo/${
                        posts[post].postedBy._id
                      }?${new Date().getTime()}`}
                      onError={(i) => (i.target.src = DefaultImage)}
                      alt=''
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <h4 className='profile-name'>
                      <Link to={`/${posts[post].postedBy._id}`}>
                        {posts[post].postedBy.name}
                      </Link>
                    </h4>
                    <span className='profile-username'>
                      @{posts[post].postedBy.name}
                    </span>
                  </div>
                  <span className='post-page-body'>{posts[post].body}</span>
                  {posts[post].photo && (
                    <div className='post-img-container'>
                      {
                        <img
                          src={`https://tweaker-twitter.herokuapp.com/api/post/photo/${
                            posts[post]._id
                          }?${new Date().getTime()}`}
                          alt=''
                        />
                      }
                    </div>
                  )}
                  {postPageId && <div className='line' />}
                  <div>
                    <div>
                      <ReplyButton className='post-buttons' />
                    </div>
                    <div
                      onClick={
                        userLikes.includes(posts[post]._id)
                          ? async (event) => {
                              event.stopPropagation();
                              await unlikePostStart(
                                posts[post]._id,
                                currentUserId
                              );
                              posts[post].likes.length =
                                posts[post].likes.length - 1;
                            }
                          : async (event) => {
                              event.stopPropagation();
                              await likePostStart(
                                posts[post]._id,
                                currentUserId
                              );
                              posts[post].likes.length =
                                posts[post].likes.length + 1;
                            }
                      }>
                      {userLikes.includes(posts[post]._id) ? (
                        <div>
                          <HeartButtonLiked className='post-buttons liked' />
                        </div>
                      ) : (
                        <div>
                          <HeartButton className='post-buttons' />
                        </div>
                      )}
                      {!postPageId && <span>{posts[post].likes.length}</span>}
                    </div>
                  </div>
                </div>
                {/* {<CreateCommentModal post={posts[post]} />} */}
              </React.Fragment>
            );
          })
        ) : (
          <span>No posts to show</span>
        )}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  userLikes: selectUserLikes,
  isPostFetching: selectIsPostFetching,
  isPostByIdFetching: selectIsPostByIdFetching,
  currentUserId: selectCurrentUserId,
});

const mapDispatchToProps = (dispatch) => ({
  getPostByIdStart: (postId) => dispatch(getPostByIdStart({ postId })),
  getPostByUserStart: (userProfileId) =>
    dispatch(getPostByUserStart({ userProfileId })),
  getPostByFollowingStart: (userId) =>
    dispatch(getPostByFollowingStart({ userId })),
  likePostStart: (postId, userId) =>
    dispatch(likePostStart({ postId, userId })),
  unlikePostStart: (postId, userId) =>
    dispatch(unlikePostStart({ postId, userId })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
