import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUsers } from "../api";

const LoginForm = () => {
    const { setLoggedInUser, setIsLoggedIn } = useContext(UserContext);
    const [users, setUsers] = useState([]);
  
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(false);
 
    const [error, setError] = useState(null);
 
    useEffect(() => {
        getUsers().then((res) => {
   
            setUsers(res.rows)
        })
    }, [])

    const handleLClose = () => {

        setError(null);
    };
 
    const handleLSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            const user = users.filter((user) => {
                return user.username === username
            })
            if (user.length === 0) {
                setError({code: "user not found", message:"user not found"});

            } else {
                const loggedUser = user[0];
                setLoggedInUser(loggedUser);
                setIsLoggedIn(true);

            }
        } else {
            setError({code: "user not found", message:"user name is  not valid"});
         
        }
    }

    const usernameHandler = (evt) => {
        let inputVal = evt.target.value;
        var letters = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
        const isValidInput = letters.test(inputVal);
        if (isValidInput) {
            setUsername(evt.target.value);
            setIsValid(true)
        } else {
            setIsValid(false)
            setError({code: "user not found", message:"user name is  not valid"});

        }
    }
   
    if (error){

        return <section><p>Error Code={error.code},Error Message={error.message}</p>
               <button onClick={handleLClose}>Cancel</button> 
        </section>
       
    };
    return (
        <div>
        
                 <form>
                <label>User Name:</label>
                <input  autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            variant="standard"
                            placeholder="Eg:'jessjelly' or 'grumpy19 ...."
                            required={true}
                            onChange={usernameHandler} />
                             <button onClick={handleLSubmit} type='submit' className="atticleDetail_commentsBtn">Login</button>
                </form>
                           
            
        </div>
    );
}
export default LoginForm;
