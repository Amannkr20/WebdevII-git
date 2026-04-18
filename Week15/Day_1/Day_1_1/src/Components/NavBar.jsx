import { useContext } from 'react';
import { ThemeContext } from '../Context/Theme.jsx'; 

export default function NavBar() {
    // themeValue will be { clr: "yellow" }
    const themeValue = useContext(ThemeContext);
    
    console.log(themeValue);

    return (
        <h1 style={{ color: themeValue.clr }}>
            Welcome to my page
        </h1>
    );
}