import {Link} from "react-router-dom";

export default function Nav() {
    return (
        <diV style={{ display: "flex", gap: "20px",justifyContent: "space-around", backgroundColor: "White",color:"white", padding: "10px" }}>
            <h1><Link to="/">Home</Link></h1>
            <h1><Link to="/login">login</Link></h1>
            <h1><Link to="/about">about </Link></h1>
            <h1><Link to="/logout">logout</Link></h1>
            <h1><Link to="/user">user</Link></h1>
            <h1><Link to="/student">Students</Link></h1>
        </diV>
    );
}








