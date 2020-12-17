import React from 'react';

import './CustomButton.scss';

const CustomButton = ({
  children,
  editProfileButton,
  followProfileButton,
  saveProfileButton,
  followingButton,
  unFollowingButton,
  ...otherProps
}) => (
  <button
    className={`${editProfileButton ? 'edit-profile-button' : ''} ${
      followingButton ? 'following-button' : ''
    } ${unFollowingButton ? 'unfollowing-button' : ''} ${
      followProfileButton ? 'follow-profile-button' : ''
    } ${saveProfileButton ? 'save-profile-button' : ''} custom-button`}
    {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
