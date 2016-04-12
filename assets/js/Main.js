(function(){
    document.getElementById('start').addEventListener('click',function(){
        //Elemento del DOm


        document.getElementsByClassName('container')[0].className += ' fadeOut';
        var out = setTimeout(function(){
            document.getElementsByClassName('wrapper')[0].innerHTML = getTempleteMachine();
            document.getElementsByClassName('container')[0].className += ' fadeIn';
        },1000);
    });
})(this);

function getTempleteMachine(){
    return "<secction class='container c-white border-style'>" +
                "<article class='getData'>" +
                "</article>" +
                "<article class='information c-medium-yellow'>" +
                    "<h2>Configuración de la máquina de turing</h2>" +
                    "<h5>Introduzca los datos de la septupla</h5>" +
                    "<h3 class='important cf-hard-brown'>M = { Q, Σ, Γ, s, Ѣ, F, δ }</h3>" +
                "</article>" +
            "</secction>"
}
