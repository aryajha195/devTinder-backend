import axios from "axios"
import { useEffect, useState } from "react"

const HeaderList =({requests}) => {
    const [dataList, setDataList] = useState([]);
    const getDataList = () => {
        if(requests === "true") {

        }
        else{
            axios.get("http://localhost:3000/user/connections")
            .then(res => {
                setDataList(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(getDataList, []);

   
    return (
    <div className="absolute top-10 shadow-lg z-10 bg-white px-4 py-2">
        {
            dataList.map(user => <div key={user._id}>{user.firstName} {user.lastName}</div>)
            
        }
    </div>)
}

export default HeaderList;