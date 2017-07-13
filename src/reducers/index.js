// This is our master reducer — the root reducer.
// The root reducer holds ALL pieces of application state.
// Reducers hold pieces of state. The root reducer holds all the reducers.

// Fetch the combineReducers method from redux to make a rootReducer that the Provider can use.
import { combineReducers } from 'redux';

// Import each reducer here
import StudentReducer from './StudentReducer'

// Create a rootReducer using the combineReducer method so we can export it to the Store in index.js
const rootReducer = combineReducers({
  //Inside the rootReducer, each reducer is passed as a key/value pair. Each key will be available as a piece of state.
  students: StudentReducer
});

export default rootReducer;