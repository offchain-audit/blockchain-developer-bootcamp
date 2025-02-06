import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { provider } from './reducers';

const reducer = combineReducers({
    provider
})

const initialState = {}

const middleware = []

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

