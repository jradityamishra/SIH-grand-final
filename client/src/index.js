import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from "./context/ChatProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
   <ChatProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChatProvider>
   </Provider>
  </React.StrictMode>
);

