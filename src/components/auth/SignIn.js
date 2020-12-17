import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Google } from '../icons/google-icon.svg';
import { ReactComponent as Facebook } from '../icons/facebook-icon.svg';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

import { signInStart, redirectToSign } from '../../redux/user/userActions';
import {
  selectUserError,
  selectRedirectToSignIn,
} from '../../redux/user/userSelector';

import './SignIn&SignUp.scss';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    this.props.redirectToSign();
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { signInStart } = this.props;
    signInStart(email, password);
  };

  render() {
    return (
      <div className='sign-in-and-sign-up'>
        <span className='sign-in-and-sign-up-header'>Sign In</span>

        <form className='sign-in-and-sign-up-form' onSubmit={this.handleSubmit}>
          {this.props.error && (
            <span className='alert-error'>{this.props.error}</span>
          )}

          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='Email'
            required
            autoFocus
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            required
          />

          <CustomButton type='submit'>Sign In</CustomButton>
        </form>

        <div>
          <span>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </span>
          <span>.</span>
          <span>
            <Link to='/signup'>Sign Up</Link>
          </span>
        </div>

        <span>or</span>
        <span>Sign In Using:</span>

        <div>
          <Google className='sign-in-button' />
          <Facebook className='sign-in-button' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectUserError,
  redirectToSignIn: selectRedirectToSignIn,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart({ email, password })),
  redirectToSign: () => dispatch(redirectToSign(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
