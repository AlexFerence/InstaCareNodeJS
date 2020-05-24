function createBox(symptom, patientID) {
    var line = document.getElementById("separator");

    var wrapper = document.createElement("DIV");
    var box = document.createElement("DIV");
    var go = document.createElement("BUTTON");
    var p = document.createElement("P");

    wrapper.classList.add("wrapper");
    box.classList.add("box");
    go.classList.add("go");

    go.innerHTML = "GO";
    go.setAttribute("onclick", `go(${patientID})`);
    p.innerHTML = symptom;

    box.appendChild(p);
    wrapper.appendChild(box);
    wrapper.appendChild(go);

    line.parentNode.insertBefore(wrapper, line.nextSibling);
}

function go(patientID) {

}

window.onload = function() {
    var xhr = new XMLHttpRequest();
    var url = "https://instachat-openhack.herokuapp.com/doctor/allPatients";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        console.log(xhr);

        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);

            for(symptom of json) {
                createBox(symptom.symptoms, symptom.patientID);
            }
        }
    };

    xhr.send();
}
