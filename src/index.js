import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
 
import './App.scss'
import { store } from './features/store';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  {/* Применяем HashRouter чтобы при  */}
  <HashRouter> 
  {/* <BrowserRouter> */}
  <App />
  {/* </BrowserRouter> */}
  </HashRouter>

</Provider>

 
 );
