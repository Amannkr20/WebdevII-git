import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{ThemeContext} from './Components/ThemeContext.jsx'

// 2. provider naam ka component / global box bana rha hai 

createRoot(document.getElementById('root')).render(
  <ThemeContext.Provider value={{chintu:"teal"}}>    
  {/*  app ko theme ke around wrap kr diya ye upr ka hai  */}
    <App />
  </ThemeContext.Provider>, // ye niche ka hai 
)
