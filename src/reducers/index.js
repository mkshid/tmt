import { combineReducers } from 'redux';
import showsReducer from './showsReducer';
import loadingReducer from './loadingReducer';
import controlReducer from './controlReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  shows: showsReducer,
  loading: loadingReducer,
  control: controlReducer,
  error: errorReducer
});

export default rootReducer;
