import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './redux/store/Store';
import { theme } from './styles/themes';
import { CssBaseline,  } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
     <ThemeProvider theme={theme}>
     <CssBaseline />
    <App />
    </ThemeProvider>
  </Provider>
);


reportWebVitals();
