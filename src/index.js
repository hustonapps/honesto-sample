import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadTheme } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import * as serviceWorker from './serviceWorker';

loadTheme({
  defaultFontStyle: { fontFamily: 'Roboto, sans-serif' },
  palette: {
    themePrimary: '#AB61E5',
    themeLighterAlt: '#fbf8fe',
    themeLighter: '#f1e4fb',
    themeLight: '#e5ccf7',
    themeTertiary: '#cc9cf0',
    themeSecondary: '#b572e9',
    themeDarkAlt: '#9b57cf',
    themeDark: '#8349ae',
    themeDarker: '#603681',
  },
});

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/app" component={App} />
      <Route exact path="/" component={Login} />
    </Router>
    <div className="footer">
      <img src="../../assets/Theorem.png" alt="Theorem" />
      <span>
        Copyright &copy; {new Date().getFullYear()} <span style={{ fontWeight: 700 }}>Theorem</span> All Rights Reserved
      </span>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
