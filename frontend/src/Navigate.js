import { Link } from "react-router-dom";

const Navigate = ({ user }) =>{
  const logoff = () => {
    fetch("http://localhost:5000/auth/logout")
    .then(() => {
      sessionStorage.removeItem("user");
      window.location.reload();  
    });
  };
return(
    <div className="nav">
         <span className="logo">
           <Link className="link" to="/">
             Recipe Reaper
         </Link>
         </span>
         {user ? (
             <u1 className="list">
                <li className="listItem">{user || user.displayName}</li>
                <li className="listItem" onClick={logoff}>
                Logout
                </li>
             </u1>
         ) : (
             <Link className="link" to="login">
             Login
             </Link>
         )}
    </div>
);
};
export default Navigate;
