function moveup() {
    document.getElementById("main").style.height = "300px";
    document.getElementById("welcome").style.opacity = "0";
    document.getElementById("auth-buttons").style.opacity = "0";
    document.getElementById("signup-btn").disabled = true;
    document.getElementById("login-btn").disabled = true;
}

function signup() {
    moveup();
    document.getElementById("signup").style.display = "block";
}

function login() {
    moveup();
    document.getElementById("login").style.display = "block";
}


function continueSignup() {
    if(document.getElementById("password").value != document.getElementById("repeat-password").value) {
        alert("Passwords don't match!");
    } else {
        var type = document.getElementById("signupType").value;

        if(type == "patient") {
            var xhr = new XMLHttpRequest();
            var url = "https://instachat-openhack.herokuapp.com/patient";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var json = JSON.parse(xhr.responseText);
                    localStorage.setItem("lastname", json.token);
                }
            };

            var data = JSON.stringify({
                "email": document.getElementById("email").value,
                "email": document.getElementById("email").value,
                "password": document.getElementById("password").value
            });

            xhr.send(data);

        } else if(type == "doctor") {
            document.getElementById("doctor-signup").style.display = "block";

            // Scroll to doctor signup
            var anchor = document.createElement("A");
            anchor.href = "#doctor-signup";
            anchor.click();
        }
    }
}
