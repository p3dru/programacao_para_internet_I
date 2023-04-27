document.addEventListener('DOMContentLoaded', function(){
    const select = this.querySelector(".formatting");
    select.addEventListener('change', showFormatting)
});

function showFormatting(){
    const newDiv = document.createElement('div');

    const newP = document.createElement("p");

    var option = document.querySelector(".formatting").value;

    var text = document.querySelector('#textbox').value;

    if(option == 'lower'){
        newP.textContent = text.toLowerCase();
    } else {
        newP.textContent = text.toUpperCase();
    }

    newDiv.appendChild(newP);

    const lastElement = document.getElementById("label");
    document.body.insertBefore(newDiv, lastElement.nextSibling);
}
