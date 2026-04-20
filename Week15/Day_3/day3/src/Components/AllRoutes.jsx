import {Route, Routes} from "react-router-dom";
export default function AllRoutes() {
    return( 
    <Routes>
        <Route path= "/" element={<h1>Home Page</h1>} />
        <Route path= "/login" element={<h1>Login Page</h1>} />
        <Route path= "/about" element={<h1>About Page</h1>} />
        <Route path= "/logout" element={<h1>Logout Page</h1>} />
        <Route path= "/user" element={<h1>User Page</h1>} />
        <Route path= "/student" element={<h1>Student Page</h1>} />  
    </Routes>
    );
}
