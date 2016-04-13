class TuringMachine {

  constructor(
    _Q, _Gamma, b, _Sigma, delta, q0, _F
  ) {
    this._Q = _Q;
    this._Gamma = _Gamma;
    this.b = b;
    this._Sigma = _Sigma;
    this.delta = delta;
    this.q0 = q0;
    this._F = _F;
    this.frames = [];
  }

  run(tape, position=0){
    this.frames = [];

    var state = this.transition(
      tape, position,
      this.searchTransition(
        this.q0, tape[position]
      )
    );

    return (this.isValid(state)) ? tape : undefined;

  }

  isValid(state){
    for(var i=0; i<this._F.length; i++) {
      if(state === this._F[i]) return true;
    }
    return false;
  }

  transition(tape, position, transition){
    if(transition !== undefined){

      this.frames.push({
        tape: kernel.copyArray(tape),
        position: position,
        transition: transition
      });
      
      tape[position] = transition.writeSymbol;
      (transition.moveTape === 'R') ? position++ : position--;

      var state = this.transition(
        tape, position,
        this.searchTransition(
          transition.nextState, tape[position]
        )
      );

      return (state !== undefined) ? state : transition.nextState;
    }else return undefined;
  }

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
  }
}
