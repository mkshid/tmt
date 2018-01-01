import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './components/App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
    , document.getElementById('root'));
registerServiceWorker();
