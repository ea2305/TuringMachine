class kernel {
  static copyArray(array){
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }
}
