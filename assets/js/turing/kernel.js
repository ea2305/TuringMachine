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
}

var tm = "hola";

$(document).ready(function() {

  $('#start').click(function(){
    tm = new TuringMachine(
      kernel.getQ($('input:text[name=_Q]').val()),
      kernel.getGamma($('input:text[name=_T]').val()),
      kernel.getB($('input:text[name=B]').val()),
      kernel.getSigma($('input:text[name=_E]').val()),
      kernel.getDelta($('textarea[name=delta]').val()),
      kernel.getQ0($('input:text[name=q0]').val()),
      kernel.getF($('input:text[name=_F]').val())
    );
  });

});
