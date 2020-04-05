import {
    OPEN_SIGN_IN_DIALOG,
    CLOSE_SIGN_IN_DIALOG,
} from '../actions/dialogActions';

const dialogs = (state = {}, action) => {
    switch (action.type) {
        case OPEN_SIGN_IN_DIALOG:
            return Object.assign({}, state, {
                signIn: {
                    isOpen: true,
                },
            });
        case CLOSE_SIGN_IN_DIALOG:
            return Object.assign({}, state, {
                signIn: {
                    isOpen: false,
                },
            });
        default:
            return state;
    }
};

export default dialogs;
