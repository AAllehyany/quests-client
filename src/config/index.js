import reducers from './reducers';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

export function configureStore() {
    const store = createStore(
        reducers,
        applyMiddleware(thunk)
    )

    return store;
};