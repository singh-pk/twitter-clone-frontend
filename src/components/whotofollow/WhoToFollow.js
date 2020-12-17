import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  fetchWhoToFollowStart,
  fetchUserProfileStart,
  followUserStart,
} from '../../redux/profile/profileActions';

import {
  selectWhoToFollow,
  selectUsersListIsFetching,
} from '../../redux/profile/profileSelector';
import { selectCurrentUserId } from '../../redux/user/userSelector';

import DefaultImage from '../icons/default_img.jfif';
import CustomButton from '../custom-button/CustomButton';

import './WhoToFollow.scss';

class WhoToFollow extends React.Component {
  componentDidMount() {
    const { fetchWhoToFollowStart, currentUserId } = this.props;
    fetchWhoToFollowStart(currentUserId);
  }

  render() {
    const {
      isFetching,
      whoToFollow,
      fetchUserProfileStart,
      followUserStart,
      currentUserId,
    } = this.props;
    return isFetching ? (
      <div className='isloading-container'>
        <div className='isloading' />
      </div>
    ) : (
      <div className='profile-user-list'>
        {whoToFollow.length > 0 && (
          <>
            <h3>Who to follow</h3>
            {whoToFollow.map((user) => (
              <div key={user._id} className='users-list'>
                <div className='user-list-container'>
                  <div className='user-profile-pic'>
                    <div className='user-profile-img-container'>
                      <img
                        src={`http://localhost:8080/api/user/photo/${
                          user._id
                        }?${new Date().getTime()}`}
                        onError={(i) => (i.target.src = DefaultImage)}
                        alt={user.name}
                        className='user-profile-img'
                      />
                    </div>
                  </div>
                  <div className='user-profile-info'>
                    <Link
                      to={`${user._id}`}
                      onClick={() => fetchUserProfileStart(user._id)}>
                      <h4>{user.name}</h4>
                      <span>@{user.name.split(' ').join('')}</span>
                    </Link>
                  </div>
                </div>
                <CustomButton
                  followProfileButton
                  onClick={() => followUserStart(currentUserId, user._id)}>
                  Follow
                </CustomButton>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchWhoToFollowStart: (userId) =>
    dispatch(fetchWhoToFollowStart({ userId })),
  fetchUserProfileStart: (userId) =>
    dispatch(fetchUserProfileStart({ userId })),
  followUserStart: (userId, followId) =>
    dispatch(followUserStart({ userId, followId })),
});

const mapStateToProps = createStructuredSelector({
  whoToFollow: selectWhoToFollow,
  isFetching: selectUsersListIsFetching,
  currentUserId: selectCurrentUserId,
});

export default connect(mapStateToProps, mapDispatchToProps)(WhoToFollow);
