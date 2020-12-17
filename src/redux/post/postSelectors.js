import { createSelector } from 'reselect';

const selectPost = (state) => state.post;

export const selectPosts = createSelector([selectPost], (post) => post.posts);

export const selectIsPostFetching = createSelector(
  [selectPost],
  (post) => post.isPostFetching
);

export const selectIsPostByIdFetching = createSelector(
  [selectPost],
  (post) => post.isPostByIdFetching
);

export const selectPostById = (postId) =>
  createSelector([selectPosts], (posts) => posts[postId]);

export const selectPostByIdPostedByName = (postId) =>
  createSelector(
    [selectPosts],
    (posts) =>
      posts[postId] && posts[postId].postedBy && posts[postId].postedBy.name
  );

export const selectPostByIdPostedById = (postId) =>
  createSelector(
    [selectPosts],
    (posts) =>
      posts[postId] && posts[postId].postedBy && posts[postId].postedBy._id
  );
