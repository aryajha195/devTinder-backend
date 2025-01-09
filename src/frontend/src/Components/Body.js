import axios from "axios";
import Header from "./Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";


const Body = () => {
    const [feedData, setFeedData] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    const getFeed = () => {
        if(Cookies.get("token")) {
            axios.get("http://localhost:3000/user/feed")
            .then((resp) => {
                console.log(resp)
                setFeedData(resp.data)
                setCurrIndex(0);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const handleNextClick = () => {
        if(feedData.length && currIndex < feedData.length-1){
            setCurrIndex(currIndex+1);
        }
    }

    const handlePrevClick = () => {
        if(feedData.length && currIndex > 0) {
            setCurrIndex(currIndex-1);
        }
    }

    const handleIgnoreInterestedClick = (status) => {
        if(feedData.length && currIndex >=0 && currIndex < feedData.length) {
            axios.post("http://localhost:3000/requests/send/"+status+"/"+feedData[currIndex]._id)
            .then(res => {
                console.log(res)
                getFeed();
            })
        }
    }

    useEffect(getFeed, [])

    
    return (
        <div className="bg-zinc-950 h-full">
            <Header />
            <div className="text-white h-3/4 flex justify-center">
            {feedData.length > 0 ? <UserCard key={feedData[currIndex]._id} user={feedData[currIndex]}/> : null}
            </div>
            <div className="text-white">
                <button className="m-4 rounded-3xl border px-6 py-2 bg-gray-500 " onClick={handlePrevClick}>Previous</button>
                <button className="m-4 rounded-3xl border px-6 py-2 bg-red-500 " onClick={() => handleIgnoreInterestedClick("ignored")}>Ignore</button>
                <button className="m-4 rounded-3xl border px-6 py-2 bg-pink-600 " onClick={() => handleIgnoreInterestedClick("interested")}>Like</button>
                <button className="m-4 rounded-3xl border px-6 py-2 bg-gray-500 " onClick={handleNextClick}>Next</button>
            </div>
        </div>
    )
}

export default Body;