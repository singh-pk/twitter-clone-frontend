import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/CustomButton';
import DefaultImage from '../icons/default_img.jfif';
import { ReactComponent as PostImage } from '../icons/post-image-button.svg';
import { ReactComponent as CancelButton } from '../icons/cancel-button.svg';

import {
  selectCurrentUserId,
  selectCurrentUserName,
} from '../../redux/user/userSelector';

import { createPostStart } from '../../redux/post/postActions';

import './Tweet.scss';

class Tweet extends React.Component {
  state = {
    body: '',
    photo: null,
    postData: new FormData(),
  };

  setInputHeight = (element) => {
    const target = element.target ? element.target : element;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setInputHeight(event);
    this.setState({ [name]: value });
    this.state.postData.set(name, value);
  };

  handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ photo: reader.result });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    this.state.postData.set('photo', event.target.files[0]);
  };

  handleCancel = () => {
    this.setState({ photo: null });
    this.state.postData.delete('photo');
  };

  render() {
    const {
      currentUserId,
      currentUserName,
      createPostStart,
      tweetComment,
    } = this.props;
    return (
      <div className={`tweet ${tweetComment && 'tweet-comment'}`}>
        <div>
          <div className='user-pic'>
            <img
              src={`http://localhost:8080/api/user/photo/${currentUserId}?${new Date().getTime()}`}
              onError={(i) => (i.target.src = DefaultImage)}
              alt={currentUserName}
            />
          </div>
        </div>
        <div>
          <div>
            <textarea
              name='body'
              type='text'
              value={this.state.body}
              placeholder={
                tweetComment ? `Tweet your reply` : `What's happening?`
              }
              onChange={this.handleChange}
            />
            {this.state.photo && (
              <div>
                <img src={this.state.photo} alt='' />
                <div onClick={this.handleCancel}>
                  <CancelButton className='icon tweet-cancel-button' />
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              <PostImage
                className='icon post-image-icon'
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
            <CustomButton
              saveProfileButton
              disabled={this.state.body || this.state.photo ? false : true}
              onClick={() =>
                createPostStart(currentUserId, this.state.postData)
              }>
              {tweetComment ? 'Reply' : 'Tweet'}
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
  currentUserName: selectCurrentUserName,
});

const mapDispatchToProps = (dispatch) => ({
  createPostStart: (userId, postData) =>
    dispatch(createPostStart({ userId, postData })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
