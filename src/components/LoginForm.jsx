import * as React from 'react';
import { UserContext } from "../contexts/User";
import { getUsers } from "../api";

const LoginForm = () => {
    const { setLoggedInUser, setIsLoggedIn } = React.useContext(UserContext);
    const [users, setUsers] = React.useState([]);
    const [lopen, setlOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const [status, setStatusBase] = React.useState("");
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        getUsers().then((res) => {
          //  console.log(res, '<<users')
            setUsers(res.rows)
        })
    }, [])

    // const handleLClickOpen = () => {
    //     setlOpen(true);
    // };

    // const handleLClose = () => {
    //     setlOpen(false);
    // };

    const handleLSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            const user = users.filter((user) => {
                return user.username === username
            })
            if (user.length === 0) {
                setError({code: "user not found", message:"user not found"});
                setStatusBase({ msg: "User not found! Please try to login with happyamy2016, grumpy19 or jessjelly", key: Math.random() });
            } else {
                const loggedUser = user[0];
                setLoggedInUser(loggedUser);
                setIsLoggedIn(true);
                setlOpen(false);
               
            }
        } else {
            setError({code: "user not found", message:"user name is  not valid"});
            setStatusBase({ msg: "Username is not valid", key: Math.random() });
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
            setStatusBase({ msg: "Username should contain letters and numbers only.", key: Math.random() });
        }
    }
    if (error){
        return <p>Error Code={error.code} ,  Error Message={error.message}</p>;
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
                             {/* <button onClick={handleLSubmit} type='submit'>Login</button> */}
                             {/* <button onClick={handleLClose}>Cancel</button> 
             */}
        </div>
    );
}
export default LoginForm;
