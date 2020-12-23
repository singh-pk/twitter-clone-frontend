import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../../components/custom-button/CustomButton';
import { ReactComponent as SearchButton } from '../../components/icons/search-icon.svg';
import { ReactComponent as People } from '../../components/icons/people.svg';
import { ReactComponent as Conversation } from '../../components/icons/conversation.svg';

import './WelcomePage.scss';

const WelcomePage = ({ history }) => {
  return (
    <div className='welcome-page'>
      <div>
        <div>
          <h1>See what's happening in the world right now</h1>
          <div>
            <h4>Join Twitter today.</h4>
            <CustomButton onClick={() => history.push('/signup')}>
              Sign up
            </CustomButton>
            <CustomButton
              editProfileButton
              onClick={() => history.push('/signin')}>
              Log in
            </CustomButton>
          </div>
        </div>
        <div>
          <h2>
            <SearchButton /> Follow your interests.
          </h2>
          <h2>
            <People />
            Hear what people are thinking about.
          </h2>
          <h2>
            <Conversation />
            Join the conversation.
          </h2>
        </div>
      </div>
      <nav>
        <div>About</div>
        <div>Help Center</div>
        <div>Terms of Service</div>
        <div>Privacy Policy</div>
        <div>Cookie Policy</div>
        <div>Ads info</div>
        <div>Blog</div>
        <div>Status</div>
        <div>Careers</div>
        <div>Brand Resources</div>
        <div>Advertising</div>
        <div>Marketing</div>
        <div>Twitter for Business</div>
        <div>Developers</div>
        <div>Directory</div>
        <div>Settings</div>
        <div>&copy; 2020 Twitter, Inc.</div>
      </nav>
    </div>
  );
};

export default withRouter(WelcomePage);
