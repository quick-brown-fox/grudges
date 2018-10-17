import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import './index.css';
import Application from './Application';
import config from './aws-exports';

Amplify.configure(config);

ReactDOM.render(<Application />, document.getElementById('root'));
