import { SET_USERNAME, ADD_USER } from '../actions/userActions';

const userInfo = (state = {}, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return Object.assign({}, state, {
                username: action.username,
            });
        case ADD_USER:
            return Object.assign({}, state, {
                validUsers: [
                    ...state.validUsers,
                    { username: action.username, password: action.password },
                ],
            });
        default:
            return state;
    }
};

export default userInfo;
