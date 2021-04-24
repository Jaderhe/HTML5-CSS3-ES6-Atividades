$(document).ready(() => {

    const STORAGE_NAME = "news2";

    const saveData = (record) => {
        let data = loadData();
        localStorage.setItem("nometeste", data);
        let dataArray = [];
        for (let i in data){
            dataArray.push(data[i]);
        }
        dataArray.push(record);
        dataArray = JSON.stringify(dataArray);
        localStorage.setItem(STORAGE_NAME, dataArray);
    }

    const loadData = () => {
        let data = localStorage.getItem(STORAGE_NAME);
        if (!data)
            data = []
        else
            data = JSON.parse(data);
        return data;    
    }

    
    var formNoticias = $("#form-noticias");

    formNoticias.on("submit", function(){
        try{
        var json = recordFromForm(formNoticias);
        saveData(json);
        addDataTable(json);
        } catch (e){
            console.log(e);
        }
        return false;
    });

    function recordFromForm(form){
        var inputs = form.find('input[type="text"], textarea'); //busca tods type text e textarea do form
        var json = "";
        inputs.each(function(idx, input){   //foreach pra montar o json
            var name = $(input).attr("name");
            var value = $(input).val();
            if (json !== "") {
                json += ",";
            }
            json += `"${name}": "${value.trim()}"`;
        });
        json = `{${json}}`;
        return JSON.parse(json);
    }

    function addDataTable(noticiasjson){
        
        var tbody = $("#table-noticias tbody");
        var tr = $("<tr></tr>");
        var tdTitulo = $("<td></td>");
        var tdIntroducao = $("<td></td>");
        var tdAcao = $("<td></td>"); //<button type='button'>

        tdTitulo.text(noticiasjson['titulo']); //funciona com ['atributo'] ou . atributo
        tdIntroducao.text(noticiasjson.introducao);
        
        var remover = $("<a href='#'></a>"); //cria um link nessa var
        remover.text("remover"); //add o texto do link
        remover.addClass("btn btn-sm btn-danger") //estiliza o botão
        tdAcao.append(remover);

        remover.on("click", function(){
            tr.remove();
            rowCount();
            return false; //não atualizar a página devido ao href
            //removeRow(tr);
        });


        tr.append(tdTitulo, tdIntroducao, tdAcao); //, tdAcao
        tbody.append(tr);
        rowCount();

        /*function removeRow(tr){
            tr.remove();
        }*/

        function rowCount(){
            var total = $("#table-noticias tbody tr").length;

            $("#table-noticias tfoot tr td span").text(total);
        }

    }
    
});