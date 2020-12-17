import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../../components/custom-button/CustomButton';

import { selectUserError, selectMessage } from '../../redux/user/userSelector';

import { forgotPasswordStart } from '../../redux/user/userActions';

import './ForgotPasswordPage.scss';

class ForgotPasswordPage extends React.Component {
  state = {
    email: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { forgotPasswordStart } = this.props;
    forgotPasswordStart(email);
    this.setState({ email: '' });
  };

  render() {
    return (
      <div className='forgot-password'>
        {this.props.error ? (
          <span className='forgot-password-error'>
            We couldn't find your account with that information
          </span>
        ) : this.props.message ? (
          <span className='forgot-password-success'>Check your email</span>
        ) : (
          <span>Find your account</span>
        )}

        {this.props.error ? (
          <span className='forgot-password-error'>
            Please try searching for your email again.
          </span>
        ) : this.props.message ? (
          <span className='forgot-password-success'>
            You'll receive a code to verify here so you can reset your account
            password.
          </span>
        ) : (
          <span>Enter your email</span>
        )}

        <form onSubmit={this.handleSubmit}>
          <input
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
            autoFocus
          />
          <CustomButton saveProfileButton type='submit'>
            Search
          </CustomButton>
        </form>

        {this.props.message && (
          <span>
            If you don't see the email, check other places it might be, like
            your junk, spam, social, or other folders.
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectUserError,
  message: selectMessage,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPasswordStart: (email) => dispatch(forgotPasswordStart({ email })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
