export const SET_USERNAME = 'SET_USERNAME';
export const ADD_USER = 'ADD_USER';

export const setUsername = (username) => ({
    type: SET_USERNAME,
    username,
});

export const addUser = (user) => ({
    type: ADD_USER,
    username: user.username,
    password: user.password,
});
