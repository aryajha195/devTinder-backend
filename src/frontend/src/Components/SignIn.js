import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";


const SignIn = () => {
    const [registerPopup, setRegisterPopup] = useState(false)
    const [loginPopup, setLoginPopup] = useState(false)
    return (
        <div className="bg-[url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')] w-lvw h-lvh">
            <Header showLoginPopup = {()=>setLoginPopup(!loginPopup)}/>
            <div className="">
                <h1 className="text-center justify-center">
                Start Something Epic.
                </h1>
                <button className="bg-black text-white rounded-3xl px-6 py-1 font-bold"
                onClick={()=> {
                    setRegisterPopup(!registerPopup)
                }}>Register</button>
                {registerPopup && <Register />}
                {loginPopup && <Login />}
            </div>
        </div>
    )
}

export default SignIn;