import { useContext } from "react";
import { authContext } from "../Context/authContext";

export default function Nav() {
    const { auth, login, logout } = useContext(authContext);

    return (
        <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "lightblue", padding: "10px" }}>
            <h1>Home</h1>
            <h1>About</h1>
            
            {/* Conditional Display */}
            <h1 style={{ color: auth ? "green" : "red" }}>
                {auth ? "Logged In" : "Logged Out"}
            </h1>

            {/* Login/Logout Buttons */}
            {auth ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={login}>Login</button>
            )}
        </div>
    );
}