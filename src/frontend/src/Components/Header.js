import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({showLoginPopup}) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        axios.post("http://localhost:3000/logout")
        .then((res) => {
            console.log(res)
            navigate("/signin")
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
    <div className="flex justify-between shadow-inner">
        <div className="m-3">
            <h1 className="font-extrabold text-3xl text-white font-sans">dev Tinder</h1>
        </div>
        {
            Cookies.get("token") ? <button className="bg-white rounded-3xl px-8 py-1 m-3 font-bold" onClick={handleLogOut}>Log Out</button>
            : <button className="bg-white rounded-3xl px-8 py-1 m-3 font-bold" onClick={showLoginPopup}>Log In</button>

        }
        
    </div>)
}

export default Header;