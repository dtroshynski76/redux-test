import userInfo from './userInfo';
import dialogs from './dialogs';
import { combineReducers } from 'redux';

const app = combineReducers({
    userInfo,
    dialogs,
});

export default app;
