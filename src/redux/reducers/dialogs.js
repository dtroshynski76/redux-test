import {
    OPEN_SIGN_IN_DIALOG,
    CLOSE_SIGN_IN_DIALOG,
    OPEN_SIGN_UP_DIALOG,
    CLOSE_SIGN_UP_DIALOG,
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
        case OPEN_SIGN_UP_DIALOG:
            return Object.assign({}, state, {
                signUp: {
                    isOpen: true,
                },
            });
        case CLOSE_SIGN_UP_DIALOG:
            return Object.assign({}, state, {
                signUp: {
                    isOpen: false,
                },
            });
        default:
            return state;
    }
};

export default dialogs;
