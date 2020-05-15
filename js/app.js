
function rellenarCantidad(){

    for(let i = 1; i <= 64; i++){

        let html = `<option value="${i}">${i}</option>`

        $("#cantidad").append(html);

    }

}

rellenarCantidad();

$("#inputHost").val("");

let cantidad = 1;
let clase;
let bitsApagados;
let bitsPrendidos;
let salto;
let hosts;
let click;


$("#cantidad").change(function(){

    cantidad = parseInt($(this).val());


    console.log(cantidad);
});

function subneteo(){

    console.log(cantidad);

    $("tbody tr").remove();
    bitsPrendidos = 0;

    let exponente;

    octeto1 = parseInt($("#octeto1").val());
    octeto2 = parseInt($("#octeto2").val());
    octeto3 = parseInt($("#octeto3").val());
    octeto4 = parseInt($("#octeto4").val());


    clase = $("#inputPrefijo").val();
    console.log(clase);

    if(clase === "c"){

        for(let i = 0; i < 7; i++){

            console.log(i)

            exponente = Math.pow(2,i);
        

            if(exponente >= cantidad){
                
            
                exponente = i;
                
            
                bitsApagados = (7 - i + 1);
            
                break;
            
            }
            
        }

    }else if(clase === "b"){

        for(let i = 0; i < 7; i++){

            exponente = Math.pow(2,i);
            
            if(exponente >= cantidad){
            
                exponente = i;
            
                bitsApagados = (15 - i + 1);
        
                break;
            
            }
            
        }


    }else if(clase === "a"){

        for(let i = 0; i < 7; i++){

            exponente = Math.pow(2,i);
            
            if(exponente >= cantidad){
            
                exponente = i;
            
                bitsApagados = (22 - i + 1);
                
            
                break;
            
            }
            
        }

    }


    for(let i = 7; i > 7-exponente; i--){

        bitsPrendidos +=  Math.pow(2,i);

    }

    hosts = Math.pow(2,bitsApagados) - 2;

    salto = 256-bitsPrendidos;

    click = true;


};



$("#boton").on("click",function(){

    subneteo();

    if(click){

        console.log(cantidad)

        let html = "";

        $("#inputHost").val("");

        if(clase === "c"){

            octeto4 = 0;

            for(let i = 1; i <= cantidad; i++){
                console.log(i)
               
                
                if(i === 1){

                    html = `
            
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4}</td>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4+1}</td>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4 + salto - 2}</td>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4+salto - 1}</td>
                    </tr>
            
                `

                    $("#tabla").append(html);

                }else{

                    html = `
            
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4+=salto}</td>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4+ 1}</td>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4 + salto - 2}</td>
                        <td>${octeto1}.${octeto2}.${octeto3}.${octeto4 + salto- 1}</td>
                    </tr>
            
            
                
                `

                    $("#tabla").append(html);

                }

                
            }
            
            click = false;

            $("#inputHost").val(hosts);

    
        }else if(clase === "b"){

            octeto3 = 0;
            octeto4 = 0;

            for(let i = 1; i <= cantidad; i++){

            if(i === 1){

                html = `
            
                <tr>
                    <th scope="row">${i}</th>
                    <td>${octeto1}.${octeto2}.${octeto3}.${octeto4}</td>
                    <td>${octeto1}.${octeto2}.${octeto3}.${octeto4+1}</td>
                    <td>${octeto1}.${octeto2}.${octeto3+salto-1}.${254}</td>
                    <td>${octeto1}.${octeto2}.${octeto3+salto-1}.${255}</td>
                </tr>
            
            `

                $("#tabla").append(html);

            }else{

                html = `
            
                <tr>
                    <th scope="row">${i}</th>
                    <td>${octeto1}.${octeto2}.${octeto3+=salto}.${octeto4}</td>
                    <td>${octeto1}.${octeto2}.${octeto3}.${octeto4+ 1}</td>
                    <td>${octeto1}.${octeto2}.${octeto3+salto-1}.${254}</td>
                    <td>${octeto1}.${octeto2}.${octeto3+salto-1}.${255}</td>
                </tr>
            
            
                
            `

                $("#tabla").append(html);

            }

                
        }

        $("#inputHost").val(hosts);
            
        click = false;



    }else if(clase === "a"){

        octeto2 = 0;
        octeto3 = 0;
        octeto4 = 0;

        for(let i = 1; i <= cantidad; i++){

            if(i === 1){

                html = `
            
                <tr>
                    <th scope="row">${i}</th>
                    <td>${octeto1}.${octeto2}.${octeto3}.${octeto4}</td>
                    <td>${octeto1}.${octeto2}.${octeto3}.${octeto4+1}</td>
                    <td>${octeto1}.${octeto2+salto-1}.${255}.${254}</td>
                    <td>${octeto1}.${octeto2+salto-1}.${255}.${255}</td>
                </tr>
            
            `

                $("#tabla").append(html);

            }else{

                html = `
            
                <tr>
                    <th scope="row">${i}</th>
                    <td>${octeto1}.${octeto2+=salto}.${octeto3}.${octeto4}</td>
                    <td>${octeto1}.${octeto2+salto-1}.${octeto3}.${octeto4+ 1}</td>
                    <td>${octeto1}.${octeto2+salto-1}.${255}.${254}</td>
                    <td>${octeto1}.${octeto2+salto-1}.${255}.${255}</td>
                </tr>
            
            
                
                `

                $("#tabla").append(html);

            }

                
        }

        $("#inputHost").val(hosts);
            
        click = false;

    }




}

    

})







    






