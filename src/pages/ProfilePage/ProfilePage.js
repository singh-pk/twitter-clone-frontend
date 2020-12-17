import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Profile from '../../components/profile/Profile';
import WhoToFollow from '../../components/whotofollow/WhoToFollow';
import Posts from '../../components/posts/Posts';

import { selectCurrentUserId } from '../../redux/user/userSelector';

import './ProfilePage.scss';

const ProfilePage = ({ currentUserId, match }) => {
  return (
    <div className='profile-page'>
      <Profile />
      {currentUserId === match.params.userId && <WhoToFollow />}
      <Posts userProfileId={match.params.userId} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
});

export default withRouter(connect(mapStateToProps)(ProfilePage));
