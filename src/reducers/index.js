import { combineReducers } from 'redux';
import showsReducer from './showsReducer';
import loadingReducer from './loadingReducer';
import controlReducer from './controlReducer';

const rootReducer = combineReducers({
  shows: showsReducer,
  loading: loadingReducer,
  control: controlReducer
});

export default rootReducer;
