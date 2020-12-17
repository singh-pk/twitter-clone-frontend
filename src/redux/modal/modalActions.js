import { ModalActionTypes } from './modalTypes';

export const toggleModalHidden = () => ({
  type: ModalActionTypes.TOGGLE_MODAL_HIDDEN,
});

export const toggleProfileModalHidden = () => ({
  type: ModalActionTypes.TOGGLE_PROFILE_MODAL_HIDDEN,
});

export const toggleEditProfileModalHidden = () => ({
  type: ModalActionTypes.TOGGLE_EDIT_PROFILE_MODAL_HIDDEN,
});

export const toggleCommentModalHidden = () => ({
  type: ModalActionTypes.TOGGLE_COMMENT_MODAL_HIDDEN,
});
