// Vendor Imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import { createLogger } from "redux-logger";

// Local Imports
import App from "./app";
import "./styles.scss";

const logger = createLogger({
  collapsed: true
});

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));

// App Rendering
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
