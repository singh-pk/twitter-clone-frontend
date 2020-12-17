import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../../components/custom-button/CustomButton';

import { selectUserError, selectMessage } from '../../redux/user/userSelector';

import { resetPasswordStart } from '../../redux/user/userActions';

import './ResetPasswordPage.scss';

class ResetPasswordPage extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    error: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword)
      return this.setState({
        error:
          'Password and Confirm Password does not match. Please try again.',
      });

    const { resetPasswordStart, match } = this.props;
    resetPasswordStart(match.params.resetPasswordToken, password);
    this.setState({ password: '', confirmPassword: '' });
  };

  render() {
    console.log(this.props);
    return (
      <div className='reset-password'>
        {this.props.message ? (
          <span>
            Password Updated! <Link to='/signin'>Sign In</Link>
          </span>
        ) : (
          <span>Reset Password</span>
        )}

        {this.state.error ? (
          <span className='reset-password-error'>{this.state.error}</span>
        ) : this.props.error ? (
          <span className='reset-password-error'>{this.props.error}</span>
        ) : this.props.message ? (
          <span>Password Updated Successfully</span>
        ) : (
          <span>
            You'll receive a code to verify here so you can reset your account
            password.
          </span>
        )}

        <form onSubmit={this.handleSubmit}>
          <input
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
            autoFocus
          />
          <input
            name='confirmPassword'
            type='password'
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            className={`${this.state.error && 'alert-reset-input'}`}
          />
          <CustomButton saveProfileButton type='submit'>
            Submit
          </CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectUserError,
  message: selectMessage,
});

const mapDispatchToProps = (dispatch) => ({
  resetPasswordStart: (resetPasswordToken, password) =>
    dispatch(resetPasswordStart({ resetPasswordToken, password })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
);
