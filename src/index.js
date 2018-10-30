import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import './index.css';
import Application from './Application';
import config from './aws-exports';
import appsyncConfig from './aws-appsync-exports';

Amplify.configure({ ...config, ...appsyncConfig });

ReactDOM.render(<Application />, document.getElementById('root'));
