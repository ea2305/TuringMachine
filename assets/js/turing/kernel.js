class kernel {
  static copyArray(array){
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }
  static strCleanSpaces(string){
    var newString = "";
    for (var i = 0; i < string.length; i++) {
      if(
        string.charAt(i) !== ' ' &&
        string.charAt(i) !== '\n'
      )
        newString += string.charAt(i);
    }
    return newString;
  }
  static strCleanLlaves(string){
    var newString = "";
    for (var i = 0; i < string.length; i++) {
      if(
        string.charAt(i) !== '{' &&
        string.charAt(i) !== '}'
      )
        newString += string.charAt(i);
    }
    return newString;
  }

  static getQ(_Q){
    return(
      kernel.strCleanSpaces(_Q).split(',')
    );
  }
  static getGamma(_Gamma){
    return(
      kernel.strCleanSpaces(_Gamma).split(',')
    );
  }
  static getB(b){
    return(
      kernel.strCleanSpaces(b)
    );
  }
  static getSigma(_Sigma){
    return(
      kernel.strCleanSpaces(_Sigma).split(',')
    );
  }
  static getDelta(delta){
    var arrayObjDelta = [];
    var strDelta = kernel.strCleanSpaces(delta);
    var arrayDelta = strDelta.split("},");
    for (var i = 0; i < arrayDelta.length; i++) {
      arrayDelta[i] = kernel.strCleanLlaves(arrayDelta[i]);
      var objDelta = arrayDelta[i].split(',');
      if(objDelta.length === 5){
        arrayObjDelta.push(
          {
            currentState:objDelta[0],
            tapeSymbol:objDelta[1],
            writeSymbol:objDelta[2],
            moveTape:objDelta[3],
            nextState:objDelta[4]
          }
        );
      }
    }
    return arrayObjDelta;
  }
  static getQ0(q0){
    return kernel.strCleanSpaces(q0)
  }
  static getF(_F){
    return(
      kernel.strCleanSpaces(_F).split(',')
    );
  }
  static getTape(tape){
    return(
      kernel.strCleanSpaces(tape).split(',')
    );
  }
  static updateIndexTape(){
    var box=[];
    var element;
    var indexMenor = kernel.getMenorIndex(Object.keys(tape));
    var indexMayor = kernel.getMayorIndex(Object.keys(tape));

    for (var i = indexMenor; i <= indexMayor; i++) {
      box.push(tape[i]);
    }
    element = box.shift();
    if(element !== tm.b) box.unshift(element);
    element = box.pop();
    if(element !== tm.b) box.push(element);
    box.unshift(tm.b);
    box.push(tm.b);
    return box;
  }
  static getMenorIndex(arreglo){
    var element = parseInt(arreglo[0]);
    var menor = element;
    for (var i = 1; i < arreglo.length; i++) {
      element = parseInt(arreglo[i]);
      menor = (element < menor) ? element : menor;
    }
    return menor;
  }
  static getMayorIndex(arreglo){
    var element = parseInt(arreglo[0]);
    var mayor = element;
    for (var i = 1; i < arreglo.length; i++) {
      element = parseInt(arreglo[i]);
      mayor = (element > mayor) ? element : mayor;
    }
    return mayor;
  }
  static updateData(){
    _Q = tm._Q;
    _Gamma = tm._Gamma;
    b = tm.b;
    _Sigma = tm._Sigma;
    delta = tm.delta;
    q0 = tm.q0;
    _F = tm._F;
  }
}

var tm;
var tape;

$(document).ready(function() {

  $('#start').click(function(){
    tape = kernel.getTape($('input:text[name=tape]').val());
    tm = new TuringMachine(
      kernel.getQ($('input:text[name=_Q]').val()),
      kernel.getGamma($('input:text[name=_T]').val()),
      kernel.getB($('input:text[name=B]').val()),
      kernel.getSigma($('input:text[name=_E]').val()),
      kernel.getDelta($('textarea[name=delta]').val()),
      kernel.getQ0($('input:text[name=q0]').val()),
      kernel.getF($('input:text[name=_F]').val())
    );
    kernel.updateData();
  });

});
