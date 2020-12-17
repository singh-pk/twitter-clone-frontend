import { createSelector } from 'reselect';

const selectComment = (state) => state.comment;

export const selectComments = createSelector(
  [selectComment],
  (comment) => comment.comments
);

export const selectIsCommentsFetching = createSelector(
  [selectComment],
  (comment) => comment.isCommentsFetching
);

export const selectCommentById = (commentId) =>
  createSelector([selectComments], (posts) => posts[commentId]);

const selectReplies = createSelector(
  [selectComment],
  (comment) => comment.replies
);

export const selectIsRepliesFetching = createSelector(
  [selectComment],
  (comment) => comment.isRepliesFetching
);

export const selectRepliesByCommentId = (commentId) =>
  createSelector([selectReplies], (replies) => replies && replies[commentId]);
