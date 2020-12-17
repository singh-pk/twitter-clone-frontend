import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { MoreHorizontal, Home, Profile } from './Sidebar-Icons';
import { ReactComponent as ModalIcon } from '../icons/modal-icon.svg';
import DefaultImage from '../icons/default_img.jfif';
import SmallModal from '../small-modal/SmallModal';
import SignOut from '../auth/SignOut';

import {
  toggleModalHidden,
  toggleProfileModalHidden,
} from '../../redux/modal/modalActions';
import { fetchUserProfileStart } from '../../redux/profile/profileActions';

import {
  selectModalHidden,
  selectModalHiddenProfile,
} from '../../redux/modal/modalSelector';
import { selectCurrentUser } from '../../redux/user/userSelector';

import './Sidebar.scss';

const isActive = (location, path) => location.pathname === path;

const Sidebar = ({
  hidden,
  hiddenProfile,
  currentUser,
  location,
  toggleModalHidden,
  toggleProfileModalHidden,
  fetchUserProfileStart,
}) => (
  <div className='sidebar'>
    <div className='sidebar-container'>
      <div className='sidebar-container-fixed'>
        <div>
          <NavLink
            activeClassName={`${isActive(location, '/') && 'active'}`}
            to='/'>
            <Home />
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName={`${
              isActive(location, `/${currentUser._id}`) && 'active'
            }`}
            to={`/${currentUser._id}`}
            onClick={() => fetchUserProfileStart(currentUser._id)}>
            <Profile />
          </NavLink>
        </div>
        <div onClick={() => toggleModalHidden()}>
          <MoreHorizontal />
        </div>
        <div onClick={() => toggleProfileModalHidden()}>
          <div className='sidebar-pic'>
            <div className='sidebar-img-container'>
              <img
                src={`http://localhost:8080/api/user/photo/${
                  currentUser._id
                }?${new Date().getTime()}`}
                onError={(i) => (i.target.src = DefaultImage)}
                alt={currentUser.name}
                className='sidebar-profile-img'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {!hidden && (
      <SmallModal>
        <SignOut />
      </SmallModal>
    )}
    {!hiddenProfile && (
      <>
        <SmallModal isProfileModal>
          <div>{currentUser.name}</div>
          <SignOut />
          <ModalIcon className='modal-icon' />
        </SmallModal>
      </>
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectModalHidden,
  hiddenProfile: selectModalHiddenProfile,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfileStart: (userId) =>
    dispatch(fetchUserProfileStart({ userId })),
  toggleModalHidden: () => dispatch(toggleModalHidden()),
  toggleProfileModalHidden: () => dispatch(toggleProfileModalHidden()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
