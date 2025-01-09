import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderList from "./HeaderList";

const Header = ({showLoginPopup}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined);
    const [showDropDown, setShowDropDown] = useState(false);

    const getUserDetails = () => {
        if(Cookies.get("token"))
        axios.get("http://localhost:3000/profile/view")
        .then(res => {
            console.log(res)
            setUsername(res.data.name);
        })
    }

    useEffect(getUserDetails, []);

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
            Cookies.get("token") ? (
            <div className="flex flex-row m-3">
                <div className="flex flex-col">
                    <button className="text-white px-8 py-1 bg-slate-900 rounded-3xl mx-3" onClick={() => setShowDropDown(!showDropDown)}>Connections</button>
                    {showDropDown && <HeaderList requests="false"/>}
                </div>
                
                <span className="text-white mx-3">{username}</span>
                <button className="bg-white rounded-3xl px-8 py-1 font-bold mx-3" onClick={handleLogOut}>Log Out</button>
                </div>
            )
            : <button className="bg-white rounded-3xl px-8 py-1 font-bold mx-3" onClick={showLoginPopup}>Log In</button>

        }
        
        
    </div>
    )
}

export default Header;