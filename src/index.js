import React from 'react';
import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import { useStrict } from 'mobx';

import { Provider } from 'mobx-react';

import App from './app';
import store from './store';
import './scss/index.css';

import registerServiceWorker from './registerServiceWorker';

promiseFinally.shim();
useStrict(true);

ReactDOM.render(
	<Provider {...store}>
	  <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
