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
    var data = [
    {
        patientID: 5243,
        symptoms: "Headache, muscle weakness, sweating"
    },
    {
        patientID: 6544,
        symptoms: "Dizziness"
    },
    {
        patientID: 2364,
        symptoms: "Stomach pain, vomiting"
    }
]

    for(symptom of data) {
        createBox(symptom.symptoms, symptom.patientID);
    }
}
