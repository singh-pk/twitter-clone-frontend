import { ReactComponent as CancelButton } from '../icons/cancel-button.svg';
import CustomButton from '../custom-button/CustomButton';

import './LargeModal.scss';

const LargeModal = ({
  ModalHeaderName,
  onCancelButtonClick,
  handleSave,
  children,
}) => (
  <div className='large-modal'>
    <div className='large-modal-container'>
      <header className='large-modal-header'>
        <div>
          {onCancelButtonClick && (
            <span onClick={onCancelButtonClick}>
              <CancelButton className='icon cancel-button' />
            </span>
          )}
          <h3>{ModalHeaderName}</h3>
        </div>
        {handleSave && (
          <CustomButton saveProfileButton onClick={handleSave}>
            Save
          </CustomButton>
        )}
      </header>
      <div>{children}</div>
    </div>
  </div>
);

export default LargeModal;
