// This check makes sure there is a logged in user saved in sessionStorage
// sessionStorage clears whenever the tab is closed but will survive page refreshes
// if loggedInUser is null, user will be sent back to the login page

if (sessionStorage.getItem("loggedInUser") === null) {
	window.location.replace("login.html");
}

// Logout function
function logout() {
	sessionStorage.removeItem("loggedInUser");
	window.location.replace("login.html");
}

// Create the function that creates the list
function addItem() {
	let item = document.getElementById("item_name").value;
	let qty = document.getElementById("item_qty").value;
	
	//What if the fields are blank, error handler
	
	if (item === "" || qty === "") {
		alert("Please enter both item details!");
		return;
	}
	
	//set as variable ng <p> of the grocery list
	let groceryList = document.getElementById("groceryList");
	//create a new list via DOM
	let newItem = document.createElement("li");
	newItem.innerHTML = item + " - Qty: " + qty;
	
	//add new item to the existing list
	groceryList.appendChild(newItem);
	
	//clear the fields after adding new items
	document.getElementById("item_name").value = "";
	document.getElementById("item_qty").value = "";
	
}

function clearList() {
  document.getElementById("groceryList").innerHTML = "";
}