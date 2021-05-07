// VARIÁVEIS GLOBAIS
    valorQtde1 = 0;
    valorQtde2 = 0;

//FUNÇÕES
function log(msg){
    console.log(msg);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function denyDrop(ev) {
    ev.stopPropagation();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function leave(ev){
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    if (data =="prod1"){
        $("#qtde1").prop( "disabled", true );
        $("#qtde1").val('0');
        valorQtde1 = 0;
        atualizaValores();
    }
    if (data =="prod2"){
        $("#qtde2").prop( "disabled", true );
        $("#qtde2").val('0');
        valorQtde2 = 0;
        atualizaValores();
    }
}

function dropZ2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var data2 =  document.getElementById(data);
    if (data =="prod1"){
        $("#qtde1").prop( "disabled", false );
    }
    if (data =="prod2"){
        $("#qtde2").prop( "disabled", false );
    }
}

$(document).ready(function() {
    var qtde1 = $("#qtde1");
    var qtde2 = $("#qtde2");
    var totalItens = $("#total-itens");
    var valorTotal = $("#valor-total");
        
    $(qtde1).on("change", function(){
        valorQtde1 = parseInt(qtde1.val());
        if(qtde1.val() == null || qtde1.val() ==""){
            valorQtde1 = 0;
            $("#qtde1").val('0');
        }
        //totalItens.text(valorQtde1 + valorQtde2);
        atualizaValores();
    })

    $(qtde2).on("change", function(){
        valorQtde2 = parseInt(qtde2.val());
        if(qtde2.val() == null || qtde2.val() ==""){
            valorQtde2 = 0;
            $("#qtde2").val('0');
        }
        //totalItens.text(valorQtde1 + valorQtde2);
        atualizaValores();
    })
});

function atualizaValores(){
    var totalItens = $("#total-itens");
    var valorTotal = $("#valor-total");
    total1 = valorQtde1*2.5;
    total2 = valorQtde2*3.5;
    totalItens.text(valorQtde1 + valorQtde2);
    valorTotal.text("R$ " + (total1+total2));
}