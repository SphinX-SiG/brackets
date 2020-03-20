class Buffer extends Array {
  isEmpyt(){
    return this.length === 0;
  };
  getLast(){
    return this[this.length-1];
  }
}

module.exports = function check(str, bracketsConfig) {
  let ops = bracketsConfig.map(function (item) {return item[0];});
  let clos = bracketsConfig.map(function (item) {return item[1];});
  let eqls = ops.filter(function(item){ return clos.includes(item)});
  ops = ops.filter(function(item){return !eqls.includes(item)});
  clos = clos.filter(function(item){return !eqls.includes(item)});

  let buffer = new Buffer();
  for(let i = 0; i<str.length; i++){
    if (ops.indexOf(str[i]) >= 0) {
      buffer.push(str[i]);
      continue;
    }

    if (eqls.indexOf(str[i]) >= 0) {
      if (buffer.isEmpyt() || buffer.getLast() !== str[i]) {
        buffer.push(str[i]);
      } else {
        buffer.pop();
      }
    }
    
    if (clos.indexOf(str[i]) >= 0) {
      if (ops.indexOf(buffer.pop()) != clos.indexOf(str[i])) { return false; }
    }
  }

  return Boolean(!buffer.length);
}
