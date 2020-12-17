import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PostPage from './pages/PostPage/PostPage';
import Feed from './pages/Feed/Feed';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

import { selectCurrentUser } from './redux/user/userSelector';
import {
  selectModalHidden,
  selectModalHiddenProfile,
  selectModalHiddenEditProfile,
} from './redux/modal/modalSelector';
import {
  toggleModalHidden,
  toggleProfileModalHidden,
  toggleEditProfileModalHidden,
} from './redux/modal/modalActions';

import Sidebar from './components/sidebar/Sidebar';
import Widgets from './components/widgets/Widgets';

import './Loading.scss';
import './App.scss';

const App = ({
  currentUser,
  hidden,
  hiddenProfile,
  hiddenEditProfile,
  dispatch,
}) => (
  <>
    {(!hidden || !hiddenProfile || !hiddenEditProfile) && (
      <div
        className={`${
          !hiddenEditProfile ? 'edit-profile-modal-background' : ''
        } toggle-modal`}
        onClick={() =>
          !hidden
            ? dispatch(toggleModalHidden())
            : !hiddenProfile
            ? dispatch(toggleProfileModalHidden())
            : dispatch(toggleEditProfileModalHidden())
        }
      />
    )}
    <div className={`${currentUser ? 'app' : ''}`}>
      {currentUser && <Sidebar />}
      <Switch>
        <Route
          exact
          path='/'
          render={() => (currentUser ? <Feed /> : <WelcomePage />)}
        />
        <Route
          exact
          path='/signup'
          render={() => (currentUser ? <Redirect to='/' /> : <SignUpPage />)}
        />
        <Route
          exact
          path='/signin'
          render={() => (currentUser ? <Redirect to='/' /> : <SignInPage />)}
        />
        <Route
          exact
          path='/forgot-password'
          render={() =>
            !currentUser ? <ForgotPasswordPage /> : <Redirect to='/' />
          }
        />
        <Route
          exact
          path='/reset-password/:resetPasswordToken'
          render={() =>
            !currentUser ? <ResetPasswordPage /> : <Redirect to='/' />
          }
        />
        <Route
          exact
          path='/:name/:postId'
          render={() =>
            currentUser ? <PostPage /> : <Redirect to='/signin' />
          }
        />
        <Route
          exact
          path='/:userId'
          render={() =>
            currentUser ? <ProfilePage /> : <Redirect to='/signin' />
          }
        />
      </Switch>
      {currentUser && <Widgets />}
    </div>
  </>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectModalHidden,
  hiddenProfile: selectModalHiddenProfile,
  hiddenEditProfile: selectModalHiddenEditProfile,
});

export default connect(mapStateToProps)(App);
