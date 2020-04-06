export const OPEN_SIGN_IN_DIALOG = 'OPEN_SIGN_IN_DIALOG';
export const CLOSE_SIGN_IN_DIALOG = 'CLOSE_SIGN_IN_DIALOG';
export const OPEN_SIGN_UP_DIALOG = 'OPEN_SIGN_UP_DIALOG';
export const CLOSE_SIGN_UP_DIALOG = 'CLOSE_SIGN_UP_DIALOG';

export const openSignInDialog = () => ({
    type: OPEN_SIGN_IN_DIALOG,
    isOpen: true,
});

export const closeSignInDialog = () => ({
    type: CLOSE_SIGN_IN_DIALOG,
    isOpen: false,
});

export const openSignUpDialog = () => ({
    type: OPEN_SIGN_UP_DIALOG,
    isOpen: true,
});

export const closeSignUpDialog = () => ({
    type: CLOSE_SIGN_UP_DIALOG,
    isOpen: false,
});
