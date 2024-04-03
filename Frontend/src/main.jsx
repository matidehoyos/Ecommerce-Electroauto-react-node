import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./redux/store.js"
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
        <BrowserRouter>
         <Auth0Provider
        domain="dev-z6lo4ul5mu4ko04y.us.auth0.com"
        clientId='MDtdDFHP3K72BP3pfQ9J80VLfcI53PJN'

       // domain="dev-z6lo4ul5mu4ko04y.us.auth0.com"
       //  clientId="Y1UxEwGkfcGfgvVbqV3HqmOctsemV3Nc"
            authorizationParams={{
              redirect_uri: window.location.origin
            }}>
                <App />
        </Auth0Provider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
