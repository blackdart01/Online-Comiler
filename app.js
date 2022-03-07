
var btn = document.getElementById('compile');
btn.addEventListener('click', function () {
    var output = document.getElementById('outputtext');
    var selected = document.getElementById('select').value;
    var codearea = document.getElementById('codearea');
    output.innerHTML = "Compiling...";
    var request = new XMLHttpRequest();
    request.open("POST", "https://codequotient.com/api/executeCode");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ "code": codearea.value, "langId": selected }));
    var codeId;
    request.addEventListener('load', function (event) {
        codeid = JSON.parse(event.target.response).codeId;

        var temp = setTimeout(function () {
            var req = new XMLHttpRequest;
            var string = "https://codequotient.com/api/codeResult/" + codeid;
            console.log("S " + string);
            req.open("GET", string);
            req.send();
            req.addEventListener("load", resfunction);
        }, 2000);
    })
})
function resfunction(event) {
    var d = event.target.responseText;
    var x = JSON.parse(d);
    console.log(event);
    var out = document.getElementById("outputtext");
    out.innerHTML = "";
    if (JSON.parse(x.data).output != '')
        out.innerHTML = JSON.parse(x.data).output;
    else
        out.innerHTML = "Error : " + JSON.parse(x.data).errors;
}