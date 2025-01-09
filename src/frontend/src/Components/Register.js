import { useState } from "react";
import { handleRegisterSubmit } from "../utils/handleRegisterSubmit";

const Register = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [gender, setGender] = useState(null);
    const [skills, setSkills] = useState([]);
    const [photoUrl, setPhotoUrl] = useState(null);

    const handleRegister = (event) => {
        event.preventDefault();
        const user = {
            firstName: firstName,
            lastName: lastName,
            emailId: email,
            password: password,
            gender: gender,
            skills: skills,
            photoUrl: photoUrl
        };
        handleRegisterSubmit(user)
    }
    

    return (
    <div className="popup-overlay w-2/4 h-3/4 m-auto bg-slate-300">
        <form className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input  type="text" name="firstname" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)
            } required/>
            <label htmlFor="lastname">Last Name</label>
            <input  type="text" name="lastname" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)
            }/>
            <label htmlFor="email">Email Id</label>
            <input  type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)
            }/>
            <label htmlFor="password">Password</label>
            <input  type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)
            }/>
            <label htmlFor="gender">Gender</label>
            <input  type="text" name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)
            }/>
            <label htmlFor="skills">Skills</label>
            <input  type="text" name="skills" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)
            }/>
            <label htmlFor="photoUrl">PhotoUrl</label>
            <input  type="file" name="photoUrl" id="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)
            }/>
            <button className="bg-white rounded-3xl" onClick={handleRegister}>Submit</button>
        </form>
    </div>
)}

export default Register;