//Login using Conditional Statement
//1. Retrieve data from the localStorage
//2. Check if the localStorage is not null/blank
//3. Split the String Data => Array => assign as variable

function loginUser() {
  let savedRecord = localStorage.getItem("savedUser");

  if(savedRecord === null) {
    document.getElementById("logMessage").innerHTML =
    "No user record found. Register first";
    return;
  }

  //split the data then re-assign

  //array indexing is the same as python

  let userData = savedRecord.split(" | "); //data split into array
  
  // retrieve username and password at the location of the array
  let old_name = userData[0];
  let old_uname = userData[2];
  let old_password = userData[4];
  
  //retrieve the user input via the login form
  
  let login_uname = document.getElementById("login_uname").value;
  let login_pword = document.getElementById("login_pword").value;
  
  //check credentials with conditional statements
	if(login_uname === old_uname && login_pword === old_password){
    
    //keeps memory of who logged in
    //closing the tab clears sessionStorage and sends user back to login page
    sessionStorage.setItem("loggedInUser", old_name);

		alert("Welcome " + old_name + " ! You may now add items");
		
		window.location.href = "list.html";
	} else {
		document.getElementById("logMessage").innerHTML = 
		"Invalid User Credentials!";
	}
}