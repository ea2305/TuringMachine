//Configuration of turing machine
var _Q = ["q0", "q1"];//arreglo de estados
var _Gamma = ["0", "1", undefined];// arreglo con el alfabeto de la cinta
var b = undefined;//simbolo blanco (B)
var _Sigma = ["0", "1"];//arreglo con el alfabeto del lenguaje
var delta = [
  {
    currentState:"q0",
    tapeSymbol: "0",
    writeSymbol: "1",
    moveTape: "L",
    nextState: "q0"
  },
  {
    currentState:"q0",
    tapeSymbol: "1",
    writeSymbol: "0",
    moveTape: "L",
    nextState: "q1"
  }
];//arreglo con la tabla de transition
var q0 = "q0";// estado inicial
var _F = ["q1"];// estado final

//var tape = ["1","0","0","0"];// cinta con datos
var tape = ["1","0","0","0"];// cinta con datos


//Psicion inicial
var startPos = 40;

//Elemento actual
var current = 0;
var Blank = 'B';//Elemento vacio
var creation = false;//Bandera de handler

//Carga completa de la pagina
(function(){
    $('#start').click(function(){
        $('.container').addClass('fadeOut');
        var out = setTimeout(function(){
            $('.wrapper').html(getTempleteMachine());
            $('.container').addClass('fadeIn');

            makeTape();//Inicia la cinta de la maquina
        },1000);
    })

})(this);


function makeTape(){

    tape.forEach(function(e,index){
        $('.tape').append(getDigit(e,index));
        $('#digit-' + index).css('opacity',1);
        updateTape(e,index);
    })

    if(!creation){
        //Start hanlder

        $('#start-simulation').click(function(e){
            /*
             *  Metodo de llamada a logica de Maquina de turing
             * Manejo de frames, pos ejecucion de la maquina
             */
            blockMove();
            callTuringMachine();//Llamada a instancia y ejecicion de máquina
        });

        $('#left').click(function(e){
            e.preventDefault();
            moveTapeLeft();
        });

        $('#right').click(function(e){
            e.preventDefault();
            moveTapeRight();
        });



        creation = true;
    }

}

function getPosition(index){
    return startPos + (index * 10);
}

//Modifica la posicion de la cinta
function updateTape(e,index){

    $('#digit-' + index).animate({
        'left' : getPosition(index) + '%'
    },100,function(){
        $('#digit-' + index).css("left",getPosition(index) + "%")
    });

    if(index == current)
        $('#digit-' + current).addClass('current');
}

function getDigit(e,index){
    return  "<div id='digit-"+ index +"' class='digit c-white'><p class='font-digit'>" + e + "</p></div>";
}

function getTempleteMachine(){
    return "<secction class='machine c-white border-style'>"+
        "<article class='body'>"+
            "<h2 class='results-turing'>Resultados de la máquina de turing</h2>"+
            "<div class='transition-table'></div>"+
            "<div class='current-state'>q0</div>"+
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

function moveTapeLeft(){

    if(current  == tape.length - 1)
        return;

    $('#digit-' + current).removeClass('current');
    current++;
    startPos -= 10;//Desplazamiento a la izquierda de todos los elementos

    tape.forEach(function(e,index){
        updateTape(e,index)
    });
}

function moveTapeRight(){

    if(current  == 0)
        return;

    $('#digit-' + current).removeClass('current');
    current--;
    startPos += 10;//Desplazamiento a la izquierda de todos los elementos

    tape.forEach(function(e,index){
        updateTape(e,index)
    });
}


//Llamada a maquina de turing
function callTuringMachine(){

    var tm = new TuringMachine(_Q, _Gamma, b, _Sigma, delta, q0, _F);//instancia

    console.log("tape: " + tape);
    var result = tm.run(tape, tape.length - 1);
    /* corre la maquina y reglesa el resultado
    (undefined si termino en estado no valido)*/
    console.log("result: " + result);

    function printData(element, index, array) {
      console.log(element.position);
      console.log(element.tape);
      console.log(element.transition);
    }

    //tm.frames.forEach(printData);


    var index = 0;
    var simulation = setInterval(()=>{
        if(index < tm.frames.length){
            var frame = tm.frames[index++];
            console.log(frame);
            $('.tape').empty();//Limpiamos lo elementos contenidos en el div

            tape = frame.tape;
            current = frame.position;
            console.log(tape);
            startPos = 40 - (current * 10);
            makeTape();
        }

        else{
            clearInterval(simulation);
            $('.tape').empty();//Limpiamos lo elementos contenidos en el div

            tape = result;
            console.log(tape);
            startPos = 40 - (current * 10);
            makeTape();
        }

    },1000);
}

//Evita el moviemiento de la cinta
function blockMove(){
    $('#left').prop('disabled',true);
    $('#left').addClass('disable');
    $('#right').prop('disabled',true);
    $('#right').addClass('disable');
}

//habilita el moviemiento de la cinta
function blockMove(){
    $('#left').prop('disabled',false);
    $('#left').removeClass('disable');
    $('#right').prop('disabled',false);
    $('#right').removeClass('disable');
}
