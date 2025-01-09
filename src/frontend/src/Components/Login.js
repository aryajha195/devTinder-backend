import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const navigate = useNavigate();

    const handleLoginClick = (email, password) => {

        axios.post("http://localhost:3000/login", { "emailId": email, "password": password })
            .then(resp => {
                console.log(resp);
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="h-3/4 w-1/4 bg-gray-700 m-auto">
            <form className="flex flex-col">
                <label htmlFor="email">Email Id</label>
                <input id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </form>
            <button onClick={() => handleLoginClick(email, password)}>Login</button>
        </div>
    )
}

export default Login;