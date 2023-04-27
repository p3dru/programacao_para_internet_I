document.addEventListener('DOMContentLoaded', function(){
    // seleciona o valor do elemento selecionado
    const selectElement = document.querySelector('.picture');
    selectElement.addEventListener('change', exibir);

    const checkbox = document.getElementById('term');
    checkbox.addEventListener('change', verify);
});

function exibir(){
    //cria uma nova div
    const newDiv = document.createElement("div");

    //cria uma nova tag de imagem
    const newImg = document.createElement("img");
    //pega o valor passado no select
    newImg.src = document.querySelector('.picture').value;
    console.log(newImg.src);

    //adiciona a imagem à nova div criada
    newDiv.appendChild(newImg);

    //adiciona a imagem abaixo do elemento select
    const lastElement = document.getElementById("label");
    console.log(lastElement);
    document.body.insertBefore(newDiv, lastElement.nextSibling);
}

function verify(){
    const checkbox = document.querySelector('#term');

    if(checkbox.checked){
        //cria uma nova div
        const newDiv = document.createElement("div");
    
        const newP = document.createElement("p");
        newP.textContent = 'A responsabilidade agora é sua';
        console.log(newP.value);
    
        newDiv.appendChild(newP);
    
        //adiciona a imagem abaixo do elemento select
        const lastElement = document.getElementById("lastLabel");
        console.log(lastElement);
        document.body.insertBefore(newDiv, lastElement.nextSibling);
    }
}