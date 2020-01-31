import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/app.scss';
import LoadingPage from './components/LoadingPage';

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<AppRouter />, document.getElementById('root'));
        hasRendered = true;
        document.getElementById('loader').style.display = 'none';
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

renderApp();