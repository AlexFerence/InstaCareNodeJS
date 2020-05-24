function updateSymptoms() {
    var xhr = new XMLHttpRequest();
    var url = "https://instachat-openhack.herokuapp.com/patient";
    xhr.open("PATCH", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization","Bearer " + localStorage.getItem("token"));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };

    var data = JSON.stringify({
        "symptoms": document.getElementById("symptoms").value
    });

    xhr.send(data);
}
