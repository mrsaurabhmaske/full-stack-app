import axios from "axios";
import { useState } from "react";
import { baseURL } from "../api";
import { useNavigate } from "react-router-dom";




function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async  (e) => {
        e.preventDefault();
        try {
            const user = {
                email,password
            }
            let res = await axios.post(`${baseURL}/users/login`, user);
            let token = res.data.token;
            localStorage.setItem('token', token);
            navigate("/notes")
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='LoginPage'>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Enter a Strong Password'  onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
        </div>
        
    )
}

export default LoginPage
