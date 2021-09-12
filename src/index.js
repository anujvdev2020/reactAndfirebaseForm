import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Detail from './Detail'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={App} />
    <Route path="/details" component={Detail} />
    </Switch>
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
