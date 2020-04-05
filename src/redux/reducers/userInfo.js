const userInfo = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return Object.assign({}, state, {
                username: action.username,
            });
        default:
            return state;
    }
};

export default userInfo;
