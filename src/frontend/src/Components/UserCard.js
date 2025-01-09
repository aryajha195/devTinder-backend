const UserCard = ({user}) => {
    return (
        <div className="border rounded-3xl bg-zinc-900 h-full w-1/3 m-2 p-4 flex items-center flex-col">
            <img src={user.photoUrl} alt="user profile" className="h-3/5 w-2/4 rounded-2xl"/>
            <h1 className="text-2xl py-3">{user.firstName} {user.lastName}</h1>
            <span>Skills: {user.skills.join(", ")}</span>
        </div>
    )
}

export default UserCard;