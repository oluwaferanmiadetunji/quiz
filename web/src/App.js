import React from 'react';
import { theme } from './Theme';
import Routes from './components/layout';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from './constant';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import rootSaga from './rootSaga';
import allReducers from './rootReducer';
import { actions as loginAction } from './components/login';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, allReducers);

// set up middleware to watch actions and reducers
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// create the global store
const mid = () => {
  if (process.env.NODE_ENV !== 'production') {
    return compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    return compose(applyMiddleware(...middleware));
  }
};
const store = createStore(persistedReducer, mid());

const persistor = persistStore(store);
// run the middleware for the rootsaga
sagaMiddleware.run(rootSaga);

axios.defaults.baseURL = BASE_URL;

const token = localStorage.Token;
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    delete axios.defaults.headers.common['Authorization'];
    store.dispatch(loginAction.isLogged(false));
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(loginAction.isLogged(true));
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
