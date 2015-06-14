var Rx = require('rx');

var Utils = (function () {
  
  // [Observable a] -> Observable [a]
  Array.prototype.sequence = function () {
    var xs = this;
    if (xs.length == 0) { 
      return Rx.Observable.returnValue([]);
    }
    return Rx.Observable.create((obs) => {
      var count = 0
      var data = [];
      var disposables = new Rx.CompositeDisposable();
      for (var i = 0; i <   xs.length; i++) {
          disposables.add(xs[i].take(1).subscribe((x) => { 
            data.push(x);
            count++; 
            if (count == xs.length) {
             obs.onNext(data);
             obs.onCompleted();
           }
          }, er => obs.onError(er), () => {}));
      };
      return disposables;
    });
  };

}()); 


module.exports = Utils