import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import store from "./redux/store.js"
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
        <BrowserRouter>
         <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT}   
              authorizationParams={{
                redirect_uri: window.location.origin
              }}>
                      <App />
        </Auth0Provider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
