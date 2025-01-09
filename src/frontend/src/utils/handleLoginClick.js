import axios from "axios";
import { useNavigate } from "react-router-dom";

const HandleLoginClick = async(email, password) => {
    console.log(email, password)
    const navigate = useNavigate();

    axios.post("http://localhost:3000/login", {"emailId": email, "password": password})
    .then(resp => {
        console.log(resp);
        navigate("/")
    })
    .catch((err) => {
        console.log(err)
    })
}

export default HandleLoginClick;