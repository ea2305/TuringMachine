//Arreglo de elemntos
var elements = ['B','B'];

//Psicion inicial
var startPos = 40;

//Elemento actual
var current = 0;
var Blank = 'B';//Elemento vacio
var creation = false;//Bandera de handler

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

    elements.forEach(function(e,index){
        $('.tape').append(getDigit(e,index));
        $('#digit-' + index).css('opacity',1);
        updateTape(e,index);
    })

    if(!creation){
        //Start hanlder

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

    if(current  == elements.length - 1){

        current = elements.length;
        elements.push(Blank);
        startPos -= 10;
        $('.tape').empty();//Limpiamos lo elementos contenidos en el div
        makeTape();
        return;
    }

    $('#digit-' + current).removeClass('current');
    current++;
    startPos -= 10;//Desplazamiento a la izquierda de todos los elementos

    elements.forEach(function(e,index){
        updateTape(e,index)
    });
}

function moveTapeRight(){

    if(current  == 0){
        console.log('to changes data');
        current = 0;
        elements.unshift(Blank);
        $('.tape').empty();//Limpiamos lo elementos contenidos en el div
        makeTape();
        return;
    }

    $('#digit-' + current).removeClass('current');
    current--;
    startPos += 10;//Desplazamiento a la izquierda de todos los elementos

    elements.forEach(function(e,index){
        updateTape(e,index)
    });
}
