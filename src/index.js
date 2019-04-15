import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppBeta from './AppBeta'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

import './index.css'


ReactDOM.render(
    <BrowserRouter><AppBeta /></BrowserRouter>
    , document.getElementById('root'))
serviceWorker.register();

