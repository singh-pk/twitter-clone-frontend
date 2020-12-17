import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

import { signUpStart } from '../../redux/user/userActions';
import {
  selectUserError,
  selectRedirectToSignIn,
} from '../../redux/user/userSelector';

import './SignIn&SignUp.scss';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const { signUpStart } = this.props;
    signUpStart(name, email, password);
  };

  render() {
    return (
      <div className='sign-in-and-sign-up'>
        {this.props.redirectToSignIn && <Redirect push to='/signin' />}
        <span className='sign-in-and-sign-up-header'>Sign Up</span>
        <form className='sign-in-and-sign-up-form' onSubmit={this.handleSubmit}>
          {this.props.error && (
            <span className='alert-error'>{this.props.error}</span>
          )}

          <FormInput
            name='name'
            type='text'
            value={this.state.name}
            handleChange={this.handleChange}
            label='Name'
            required
            autoFocus
          />
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            required
          />

          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectUserError,
  redirectToSignIn: selectRedirectToSignIn,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (name, email, password) =>
    dispatch(signUpStart({ name, email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
