import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthContext, AuthProvider} from "./services/AuthContext.jsx";
import {NewsProvider} from "./services/NewsContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
        <NewsProvider>    
            <App />
        </NewsProvider>
    </AuthProvider>
  </StrictMode>,
)
