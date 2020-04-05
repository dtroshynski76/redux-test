export const OPEN_SIGN_IN_DIALOG = 'OPEN_SIGN_IN_DIALOG';
export const CLOSE_SIGN_IN_DIALOG = 'CLOSE_SIGN_IN_DIALOG';

export const openSignInDialog = () => ({
    type: OPEN_SIGN_IN_DIALOG,
    isOpen: true,
});

export const closeSignInDialog = () => ({
    type: CLOSE_SIGN_IN_DIALOG,
    isOpen: false,
});
