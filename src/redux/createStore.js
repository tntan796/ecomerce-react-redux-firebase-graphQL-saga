import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import createSagaMiddle from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddle();

const middlewares = [logger, thunk, sagaMiddleware];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

export const store = createStore(
    rootReducer,
    enhancer);

sagaMiddleware.run(rootSaga);

export default store;