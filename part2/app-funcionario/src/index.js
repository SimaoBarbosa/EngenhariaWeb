import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

// Root component
import Root from "./components/Root";

ReactDOM.render(<Root/>, document.getElementById('root'));
serviceWorker.unregister();
