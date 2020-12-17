import './SmallModal.scss';

const SmallModal = ({ children, isProfileModal }) => (
  <div className={`${isProfileModal ? 'profile-modal' : ''} small-modal`}>
    <div className='small-modal-container'>{children}</div>
  </div>
);

export default SmallModal;
