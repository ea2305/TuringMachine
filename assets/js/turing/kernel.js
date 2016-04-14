class kernel {
  static copyArray(array){
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }
  static getQ(_Q){
    console.log("_Q: " + _Q);
  }
  static getGamma(_Gamma){
    console.log("_Gamma: " + _Gamma);
  }
  static getB(b){
    console.log("b: " + b);
  }
  static getSigma(_Sigma){
    console.log("_Sigma: " + _Sigma);
  }
  static getDelta(delta){
    console.log("delta: " + delta);
  }
  static getQ0(q0){
    console.log("q0: " + q0);
  }
  static getF(_F){
    console.log("_F: " + _F);
  }
}

$(document).ready(function() {

  $('#start').click(function(){
    kernel.getQ($('input:text[name=_Q]').val());
    kernel.getGamma($('input:text[name=_T]').val());
    kernel.getB($('input:text[name=B]').val());
    kernel.getSigma($('input:text[name=_E]').val());
    kernel.getDelta($('textarea[name=delta]').val());
    kernel.getQ0($('input:text[name=q0]').val());
    kernel.getF($('input:text[name=_F]').val());
  });

});
