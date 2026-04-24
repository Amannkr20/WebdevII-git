import { createContext, useState } from "react";

export const authContext = createContext();

// Component name must be Uppercase
export default function AuthContextProvider(props) {
    const [auth, setAuth] = useState(false);

    const login = () => setAuth(true);
    const logout = () => setAuth(false);

    return (
        <authContext.Provider value={{ auth, login, logout }}>
            {props.children}
        </authContext.Provider>
    );
}