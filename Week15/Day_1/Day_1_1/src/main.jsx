import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeContext } from './Context/Theme.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Providing the object with the "clr" property */}
    <ThemeContext.Provider value={{ clr: "yellow" }}>
      <App />
    </ThemeContext.Provider>
  </StrictMode>,
);