import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

// Redux store
import store  from './redux/store';

// Root component
import Root from "./components/Root";

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
serviceWorker.unregister();
