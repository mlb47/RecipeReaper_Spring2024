import { useState } from 'react';
import axios from 'axios';

function Login(){ 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const github = () => {
          window.open("http://localhost:5000/auth/github", "_self" );
};
    const google = async () => {
          window.open("http://localhost:5000/auth/google", "_self");

};

    const sendLoginRequest = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/auth/default", {username, password})
          .then((response) => {
            if (response.data.success) {
                sessionStorage.setItem("user", response.data.user.username);
            }
            window.location.reload();
          });
};

return (
        <div className="login">
            <img src="reaper.png" alt="Reaper Image" className="Reaper Image" />
            <div className="loginButton default">
            <form onSubmit={sendLoginRequest}>
                <section>
                <input type="input" placeholder = "Username"
                    value={username} onChange = {(e) => setUsername(e.target.value)}
                    name="username" id="username" />
                </section>
                <br/>
                <section>
                <input type="password" placeholder = "Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                    name="password" id="password" />
                </section>
            <button type="submit" >Sign in</button>
            </form>
        </div>
        <div className="loginButton github" onClick={google}>
                    Login with Google
            </div>
                <div className="loginButton github" onClick={github}>
                    Login with Github
            </div>
        </div>
  );
}

export default Login;
