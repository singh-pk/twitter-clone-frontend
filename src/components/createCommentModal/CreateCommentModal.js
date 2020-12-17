import { connect } from 'react-redux';

import LargeModal from '../large-modal/LargeModal';
import SingleComment from '../single-comment/SingleComment';
import Tweet from '../tweet/Tweet';

import { toggleCommentModalHidden } from '../../redux/modal/modalActions';

const CreateCommentModal = ({ post, dispatch }) => {
  console.log(post);
  return (
    <LargeModal
      onCancelButtonClick={() => dispatch(toggleCommentModalHidden())}>
      <SingleComment post={post} hasReplies={true} />
      <Tweet tweetComment />
    </LargeModal>
  );
};

export default connect()(CreateCommentModal);
