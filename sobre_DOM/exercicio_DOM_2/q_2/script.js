document.addEventListener('DOMContentLoaded', function(){
    var botaoSomar = document.getElementById('botaoSomar');
    botaoSomar.addEventListener('click', somar);
})

function somar(){
    var campo1 = document.getElementById('number1').value;
    var campo2 = document.getElementById('number2').value;

    var soma = 0;

    if (typeof(campo1) != isNaN && typeof(campo2) !== isNaN){
        campo1 = parseInt(campo1)
        campo2 = parseInt(campo2)
        soma = campo1 + campo2
        document.getElementById("resultado").innerHTML = `O resultado é ${soma}`;   
    }
}