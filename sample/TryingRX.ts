import {Observable} from "rxjs";

var source = new Observable<number>(function (observer) {
  // Yield a single value and complete
  observer.next(42);
  //observer.complete();

  // Any cleanup logic might go here
  return function () {
    console.log("disposed");
  };
});

var subscription = source.subscribe(
  function (x) { console.log('onNext: %s', x); },
  function (e) { console.log('onError: %s', e); },
  function () { console.log('onCompleted'); });


var subscription2 = source.subscribe(
  function (x) { console.log('onNext2: %s', x); },
  function (e) { console.log('onError2: %s', e); },
  function () { console.log('onCompleted2'); });

// => onNext: 42
// => onCompleted

subscription.unsubscribe();

// => disposed