class TuringMachine {

  constructor(
    _Q, _Gamma, b, _Sigma, delta, q0, _F
  ) {
    this._Q = _Q;//conjunto finito estados
    this._Gamma = _Gamma;//simbolos finitos cinta incluye b
    this.b = b;//simbolo "blanco" != simbolos (_Sigma)
    this._Sigma = _Sigma;//simbolos finitos maquina != b
    this.delta = delta;//funcion parcial transition
    this.q0 = q0;//estado inicial
    this._F = _F;//conjunto finito estados finales
    this.frames = [];//arreglo con los datos de transition
  }

  run(tape, position=0){//corre la maquina
    this.frames = [];//Limpiamos datos transition

    var state = this.transition(
      tape, position,
      this.searchTransition(
        this.q0, this.getTapeSymbol(position)
      )
    );//comienza transition y obtenemos estado en el cual termino

    return (this.isValid(state)) ? tape : undefined;

  }

  isValid(state){
    for(var i=0; i<this._F.length; i++) {
      if(state === this._F[i]) return true;
    }
    return false;
  }//si el estado es valido regresa la cinta

  transition(tape, position, transition){
    if(transition !== undefined){

      this.frames.push({
        tape: kernel.copyArray(tape),
        position: position,
        transition: transition
      });//guardamos datos

      tape[position] = transition.writeSymbol;//escribimos en la cinta
      (transition.moveTape === 'R') ? position++ : position--;//movemos cabezal

      var state = this.transition(
        tape, position,
        this.searchTransition(
          transition.nextState, this.getTapeSymbol(position)
        )
      );// seguimos la transition y guardamos el estado final

      return (state !== undefined) ? state : transition.nextState;
    }else return undefined;
  }

  getTapeSymbol(position){
    return (tape[position] !== undefined) ? tape[position] : this.b;
  }//retorna el tapeSymbol

  searchTransition(state, symbol){
    var transition;
    for (var i = 0; i < this.delta.length; i++) {
      transition = this.delta[i];
      if(
        transition.currentState === state &&
        transition.tapeSymbol === symbol
      ){
        return transition;
      }
    }
    return undefined;
  }//busca las reglas de transition
}
