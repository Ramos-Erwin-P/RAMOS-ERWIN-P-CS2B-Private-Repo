// Step 1 Get User Details, Concatenate, save to localStorage

function saveUserRecord() {
  let fname = document.getElementById("full_name").value;
  let address = document.getElementById("address").value;
  let uname = document.getElementById("user_name").value;
  let email = document.getElementById("email").value;
  let pword = document.getElementById("pword").value;

  //create a form checker using conditional statement
  // to solve this issue, use REQUIRED in <form> / create own

  if(
    fname === "" || 
    address === "" || 
    uname === "" || 
    email === "" || 
    pword === ""
    ) {
      document.getElementById("regMessage").innerHTML =
      "Please complete all required all details";
      return;
    }

    //concatenation
    //use pipeline | as a separator

    let userRecord = fname + " | " + address + " | " + uname + " | " + email + " | " + pword;

    //save to localStorage
    localStorage.setItem("savedUser", userRecord); 

    document.getElementById("regMessage").innerHTML =
    "<span style='color:green'>User details has been recorded!</span>";
    
    alert(localStorage.getItem("savedUser"));
	
	// go to next window/page

	window.location.href = "login.html"
}

