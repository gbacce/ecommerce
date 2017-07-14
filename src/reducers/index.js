import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';

const rootReducer = combineReducers({
  registerReducer: RegisterReducer
});

export default rootReducer;