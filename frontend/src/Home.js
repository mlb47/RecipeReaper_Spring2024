import { Link } from 'react-router-dom';
import axios from 'axios';
const Home = function() {

	function alertGrocery(buttonLocation) {
		const user = sessionStorage.getItem("user");
		let alertMessage = "";
		axios.get("http://localhost:5000/viewGroceries", {params: {user, location: buttonLocation}})
		.then((response) => {
			if (!response.data.goodNames && !response.data.expiredNames) {
				alertMessage = "You are not logged in.";
			}
			else {
				if (response.data.goodNames.length === 0 && response.data.expiredNames.length === 0) {
					alertMessage = "You have no groceries stored here.";
				}
				if (response.data.goodNames.length !== 0) {
					alertMessage += "Your stored groceries are the following.\n\n";
					response.data.goodNames.forEach((groceryName) => {
						const expirationDate = new Date(response.data.goodDates.at(response.data.goodNames.indexOf(groceryName)))
						alertMessage += groceryName + ", expiring " + expirationDate.toDateString("en-US") + ".\n";
					})
				}
				if (response.data.expiredNames.length !== 0) {
					alertMessage += "\nThe following foods have expired.\n\n"
					response.data.expiredNames.forEach((groceryName) => {
						const expirationDate = new Date(response.data.expiredDates.at(response.data.expiredNames.indexOf(groceryName)))
						alertMessage += groceryName + ", which expired " + expirationDate.toDateString("en-US") + ".\n";
					})
				}
			}
			
			alert(alertMessage)});
	}

    return(
        <div className="home">
            <div className="left">
		<div className="sub">
		    <button className="button1" onClick={() => {alertGrocery("Pantry")}}>Pantry</button>
		    <button className="button1" onClick={() => {alertGrocery("Fridge")}}>Fridge</button>
		    <button className="button1" onClick={() => {alertGrocery("Freezer")}}>Freezer</button>
		</div>
		<div className="sub">
		<button className="button1" onClick={() => {alertGrocery("Frequently Purchased")}}>Frequently Purchased</button>
		<button className="button1" onClick={() => {alertGrocery("Expiring Soon")}}>Expiring Soon</button>
		<button className="button1" onClick={() => {alertGrocery("In Need Of")}}>In Need Of</button>
		</div>
	    </div>
	    <div className="right">
	        <Link className="link" to="/groceries">
	        <button className="button2">+ Add New Groceries</button>
	        </Link>
	        <img src="reaper.png" alt="Reaper Image" className="Reaper Image" />
	    </div>
        </div>
    )
}

export default Home;
