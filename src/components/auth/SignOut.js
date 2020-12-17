import { connect } from 'react-redux';

import { signOutStart } from '../../redux/user/userActions';

const SignOut = ({ dispatch }) => (
  <div onClick={() => dispatch(signOutStart())}>Sign Out</div>
);

export default connect()(SignOut);
