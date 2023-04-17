var primeiroBotao = document.getElementById("botao");
primeiroBotao.addEventListener("click", function() {
    // selecione o parágrafo usando o método getElementById
    var paragrafo = document.getElementById("paragrafo");
    // altere o texto do parágrafo
    paragrafo.textContent = "O texto deste parágrafo foi alterado!";
});

//5
var segundoBotao = document.getElementById("limpar");
document.querySelector("#segundoparagrafo").classList.add("hidden");

segundoBotao.addEventListener("click", function () {
    document.querySelector("#segundoparagrafo").classList.toggle("hidden");
});

//6
var escuro = document.getElementById("escuro");
escuro.addEventListener("click", function() {
    var pagina = document.getElementById("todo");
    pagina.classList.add("to-black");
});

var claro = document.getElementById("claro");
claro.addEventListener("click", function(){
    var pagina = document.getElementById("todo");
    pagina.classList.toggle("to-black");
});