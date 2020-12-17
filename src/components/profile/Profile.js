import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Backbutton } from '../icons/back-button.svg';
import { ReactComponent as CalendarIcon } from '../icons/calendar-icon.svg';
import DefaultImage from '../icons/default_img.jfif';

import CustomButton from '../custom-button/CustomButton';
import EditProfileModal from '../edit-profile-modal/EditProfileModal';
import Header from '../header/Header';

import {
  fetchUserProfileStart,
  followUserStart,
  unFollowUserStart,
} from '../../redux/profile/profileActions';
import {
  selectUserProfile,
  selectIsFollowLoading,
  selectUserProfileFollower,
} from '../../redux/profile/profileSelector';
import {
  selectCurrentUser,
  selectUserFollowing,
} from '../../redux/user/userSelector';
import { selectModalHiddenEditProfile } from '../../redux/modal/modalSelector';
import { toggleEditProfileModalHidden } from '../../redux/modal/modalActions';

import './Profile.scss';

class Profile extends React.Component {
  componentDidMount() {
    const { fetchUserProfileStart, match } = this.props;
    fetchUserProfileStart(match.params.userId);
  }

  render() {
    const {
      userProfile,
      history,
      currentUser,
      hiddenEditProfile,
      toggleEditProfileModalHidden,
      followUserStart,
      unFollowUserStart,
      followers,
    } = this.props;
    return !userProfile ? (
      <div className='isloading-container'>
        <div className='isloading' />
      </div>
    ) : (
      <>
        <Header>
          <span>
            <Backbutton className='icon' onClick={() => history.push('/')} />
          </span>
          <h3>{userProfile.name}</h3>
        </Header>
        <div className='profile-pic'>
          <div className='background'>
            <div className='front'>
              <div className='front-img-container'>
                <img
                  src={`http://localhost:8080/api/user/photo/${
                    userProfile._id
                  }?${new Date().getTime()}`}
                  onError={(i) => (i.target.src = DefaultImage)}
                  alt={userProfile.name}
                  className='front-img'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='profile-user-info'>
          {userProfile._id === currentUser._id ? (
            <CustomButton
              editProfileButton
              onClick={() => toggleEditProfileModalHidden()}>
              Edit Profile
            </CustomButton>
          ) : (
            <>
              {followers.includes(currentUser._id) ? (
                <CustomButton
                  followingButton
                  onClick={() =>
                    unFollowUserStart(currentUser._id, userProfile._id)
                  }>
                  <span>Following</span>
                </CustomButton>
              ) : (
                <CustomButton
                  editProfileButton
                  onClick={() =>
                    followUserStart(currentUser._id, userProfile._id)
                  }>
                  Follow
                </CustomButton>
              )}
            </>
          )}
          <h3 className='profile-name'>{userProfile.name}</h3>
          <span className='profile-username'>
            @{userProfile.name.split(' ').join('')}
          </span>
          <div className='profile-user-joined'>
            <span>
              <CalendarIcon className='calendar-icon' />
            </span>
            <span className='joined-date'>
              Joined{' '}
              {new Date(userProfile.createdAt).toDateString().split(' ')[1] +
                ' ' +
                new Date(userProfile.createdAt).toDateString().split(' ')[3]}
            </span>
          </div>
          <div className='followers-list'>
            <span>
              <h4>{userProfile.following.length}</h4> Following
            </span>
            <span>
              <h4>{followers.length}</h4>
              {followers.length > 1 ? 'Followers' : 'Follower'}
            </span>
          </div>
        </div>
        {!hiddenEditProfile && <EditProfileModal />}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userProfile: selectUserProfile,
  currentUser: selectCurrentUser,
  hiddenEditProfile: selectModalHiddenEditProfile,
  isFollowLoading: selectIsFollowLoading,
  followers: selectUserProfileFollower,
  following: selectUserFollowing,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfileStart: (userId) =>
    dispatch(fetchUserProfileStart({ userId })),
  toggleEditProfileModalHidden: () => dispatch(toggleEditProfileModalHidden()),
  followUserStart: (userId, followId) =>
    dispatch(followUserStart({ userId, followId })),
  unFollowUserStart: (userId, unfollowId) =>
    dispatch(unFollowUserStart({ userId, unfollowId })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
