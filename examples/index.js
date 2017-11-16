// Vendor Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

// Local Imports
import App from './app';
import './styles.scss';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})

const store = createStore(rootReducer)

// App Rendering
ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('root'));
