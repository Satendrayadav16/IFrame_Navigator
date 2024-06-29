import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { IFrameRouteContextProvider } from './Component/IFrameRouteContext.jsx'
import { PostMessageListener } from './Component/PostMessageListener.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <IFrameRouteContextProvider>
        <PostMessageListener />
        <App />
      </IFrameRouteContextProvider>

    </BrowserRouter>

  </React.StrictMode>,
)
