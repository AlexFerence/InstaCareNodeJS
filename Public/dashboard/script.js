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
    var testData = [{patientID: 342947, symptoms: "I have a headache and arms and legs are aching. I've been sweating a lot recently."}]

    for(symptom of testData) {
        createBox(symptom.symptoms, symptom.patientID);
    }
}
