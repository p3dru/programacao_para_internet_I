document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', exibirConteudo);
    });

    function exibirConteudo() {
        var conteudo = document.getElementById('caixaDeTexto').value;

        if (conteudo == ""){
            conteudo = "Input vazio, digite algo";
            document.getElementById('conteudo').innerHTML = conteudo;
            document.getElementById('conteudo').style.color = 'red';
            alert("Digite algo na caixa de texto");
        } else {
            document.getElementById('conteudo').style.color = 'black';
            document.getElementById('conteudo').innerHTML = conteudo;
        }
    }