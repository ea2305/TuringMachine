
/*
    Cambio de configuuracion a modo maquina de turing
    Handler para cambio
*/


//Carga completa de la pagina
(function(){
    $('#start').click(function(){
        $('.container').addClass('fadeOut');
        var out = setTimeout(function(){
            $('.wrapper').html(getTempleteMachine());
            $('.container').addClass('fadeIn');
            loadTransitionTable();
            makeTape();//Inicia la cinta de la maquina
        },1000);
    })

})(this);

function getTempleteMachine(){
    return "<secction class='machine c-white border-style'>"+
        "<article class='body'>"+
            "<h2 class='results-turing'>Resultados de la máquina de turing</h2>"+

            "<div class='InformationTable'>"+
                "<div class='transition-table'>"+
                    "<h3>Tabla de Transiciones</h3>"+
                    "<div class='function-transition-head'>"+
                        "<div class='Qc table-element'>Qn</div>"+
                        "<div class='readed table-element'>Leer</div>"+
                        "<div class='write table-element'>Escribir</div>"+
                        "<div class='move-state table-element'>Dirección</div>"+
                        "<div class='nextState table-element'>Moviemiento</div>"+
                    "</div>"+

                "</div>"+
                "<div class='current-state'>"+

                    "<p>Estado de la máquina</p>"+
                    "<p id='currentState' class='cf-hard-brown'></p>"+
                    "<p class'important'>Elementos iniciales</p>"+
                    "<p id='startElements' class='cf-hard-brown'></p>"+

                "</div>"+
            "</div>"+


            "<button id='start-simulation' type='button' name='start-simulation'>Start</button>"+
            "<button id='left' type='button' name=''>Left</button>"+
            "<button id='right' type='button' name=''>Right</button>"+
        "</article>"+
        "<article class='head '>"+
            "<div class='cabezal c-white'>"+
                "<div class='pointer'></div>"+
            "</div>"+
        "</article>"+
    "</secction>"+
    "<div class='tape'>"+

    "</div>";
}

function getTransitionTable(qc,r,w,m,next){
    return "<div class='function-transition'>"+
        "<div class='Qc table-element'>"+ qc +"</div>"+
        "<div class='readed table-element'>"+r+"</div>"+
        "<div class='write table-element'>"+w+"</div>"+
        "<div class='move-state table-element'>"+m+"</div>"+
        "<div class='nextState table-element'>"+next+"</div>"+
    "</div>";
}

function loadTransitionTable(){
    if(delta != undefined || delta != null){
        delta.forEach(function(e,index){
            var read = (e.tapeSymbol == undefined)? "B" : e.tapeSymbol;
            var write = (e.writeSymbol == undefined)? "B" : e.writeSymbol;
            $('.transition-table').append(getTransitionTable(e.currentState,read,write,e.moveTape,e.nextState));
        });
    }
}
