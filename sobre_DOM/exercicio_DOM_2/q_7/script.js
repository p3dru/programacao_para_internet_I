document.addEventListener('DOMContentLoaded', function(){
    var addButton = this.querySelector('#button');
    addButton.addEventListener('click', insert);
});

function insert(){
    var newOption = document.createElement('option');
    newOption.value = document.querySelector("#textbox").value;

    var select = document.querySelector("#select");

    select.appendChild(newOption);
};