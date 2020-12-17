import { ModalActionTypes } from './modalTypes';

const INITIAL_STATE = {
  hidden: true,
  hiddenProfile: true,
  hiddenEditProfile: true,
  hiddenCreateComment: true,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_MODAL_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case ModalActionTypes.TOGGLE_PROFILE_MODAL_HIDDEN:
      return {
        ...state,
        hiddenProfile: !state.hiddenProfile,
      };
    case ModalActionTypes.TOGGLE_EDIT_PROFILE_MODAL_HIDDEN:
      return {
        ...state,
        hiddenEditProfile: !state.hiddenEditProfile,
      };
    case ModalActionTypes.TOGGLE_COMMENT_MODAL_HIDDEN:
      return {
        ...state,
        hiddenCreateComment: !state.hiddenCreateComment,
      };
    default:
      return state;
  }
};

export default modalReducer;
