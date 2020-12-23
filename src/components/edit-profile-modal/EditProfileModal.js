import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LargeModal from '../large-modal/LargeModal';
import FormInput from '../form-input/FormInput';
import DefaultImage from '../icons/default_img.jfif';

import { toggleEditProfileModalHidden } from '../../redux/modal/modalActions';
import {
  selectCurrentUser,
  selectCurrentUserName,
} from '../../redux/user/userSelector';
import { updateUserStart } from '../../redux/user/userActions';

import './EditProfileModal.scss';

class EditProfileModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      photo:
        `https://tweaker-twitter.herokuapp.com/api/user/photo/${
          this.props.currentUser._id
        }?${new Date().getTime()}` || DefaultImage,
      userData: new FormData(),
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    this.state.userData.set(name, value);
  };

  handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ photo: reader.result });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    this.state.userData.set('photo', event.target.files[0]);
  };

  render() {
    const {
      currentUser,
      toggleEditProfileModalHidden,
      updateUserStart,
    } = this.props;
    return (
      <LargeModal
        ModalHeaderName={'Edit Profile'}
        onCancelButtonClick={() => toggleEditProfileModalHidden()}
        handleSave={() =>
          updateUserStart(currentUser._id, this.state.userData)
        }>
        <div className='edit-profile-overflow'>
          <div className='profile-pic'>
            <div className='background edit-profile-pic'>
              <div className='front edit-front-pic'>
                <div className='front-img-container'>
                  <img
                    src={this.state.photo}
                    onError={(i) => (i.target.src = DefaultImage)}
                    alt={this.state.name}
                    className='front-img edit-front-img'
                    onClick={() => this.fileInput.click()}
                  />
                  <input
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={this.handleImageChange}
                    ref={(fileInput) => (this.fileInput = fileInput)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='edit-profile-input'>
            <FormInput
              name='name'
              type='text'
              value={this.state.name}
              handleChange={this.handleChange}
              label='Name'
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </LargeModal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  name: selectCurrentUserName,
});

const mapDispatchToProps = (dispatch) => ({
  toggleEditProfileModalHidden: () => dispatch(toggleEditProfileModalHidden()),
  updateUserStart: (userId, userData) =>
    dispatch(updateUserStart({ userId, userData })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
