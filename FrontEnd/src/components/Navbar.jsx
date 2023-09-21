import { Link, NavLink } from "react-router-dom"

function Navbar() {

    return (
        <div className="navbar">
            <div className="logo"><h1>Notes App</h1></div>
            <div className="links">
                <NavLink to="/"><h1>Home</h1></NavLink>
                <Link to="/users/register"><h1>Signup</h1></Link>
                <Link to="/users/login"><h1>Login</h1></Link>
            </div>
        </div>
    )
}

export default Navbar
