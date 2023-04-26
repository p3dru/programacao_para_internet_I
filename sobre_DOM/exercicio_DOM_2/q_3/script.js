document.addEventListener('DOMContentLoaded', function(){
    //aqui ele seleciona o botão que triggera a função que queremos
    var botaoLoad = this.getElementById('exibirImg');
    botaoLoad.addEventListener('click', exibir);
})

function exibir(){
    //cria uma nova div
    const novaDiv = document.createElement("div");

    //cria uma nova tag img
    const novaImg = document.createElement('img');
    //adiciona o endereço de uma imagem local à tag img
    novaImg.src = document.getElementById('nameImg').value;
    console.log(novaImg.src);   

    //adiciona a tag img à nova div criada
    novaDiv.appendChild(novaImg);

    //adicionar a imagem abaixo do elemento botao
    const ultimoElemento = document.getElementById('exibirImg');
    document.body.insertBefore(novaDiv, ultimoElemento.nextSibling);

}