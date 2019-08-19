import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider, connect } from 'react-redux';
import rootReducer from "./reducers"
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();
