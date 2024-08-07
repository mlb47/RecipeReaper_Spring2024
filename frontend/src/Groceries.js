import { useState } from 'react';
import axios from 'axios';

const Groceries = function() {
    let user = "";
    const [foodName, setFoodName] = useState("");
    const [expirationDate, setExpirationDate] = useState(Date.now);
    const [location, setLocation] = useState("Pantry");


    function addGrocery(e) {
        e.preventDefault();
        user = sessionStorage.getItem("user");
        axios.post("http://localhost:5000/addGrocery", {foodName, expirationDate, location, user})
        .then(alert("Grocery added!"))
    }

    return (
	<div className="groceryWrapper">
	    <form onSubmit={addGrocery}>
            <label for="foodName">Food Name:</label>
            <input type="input"
                value={foodName} onChange = {(e) => setFoodName(e.target.value)}
                name="foodName" id="foodName" />
            <br/>
			<br/>
            <label for="expirationDate">Expiration Date:</label>
            <input type="date" 
                value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} 
                name="expirationDate" id="expirationDate" />
            <label for="location">Location:</label>
            <select 
                value={location} onChange={(e) => setLocation(e.target.value)}
                name="location" id="location">
                <option value="Pantry">Pantry</option>
                <option value="Fridge">Fridge</option>
                <option value="Freezer">Freezer</option>
                <option value="Pantry">Frequently Purchased</option>
                <option value="Pantry">Expiring Soon</option>
                <option value="Pantry">In Need Of</option>
            </select>
            <br/>
			<br/>
            <input type="submit" value="Add Grocery" />
        </form>
	</div>
  );
}

export default Groceries;
