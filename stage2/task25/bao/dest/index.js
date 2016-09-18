'use strict';

var _Rx = require('rxjs/Rx');

// Observble.of(1,2,3).map(x=>x+'!!!').forEach()


var btn = document.getElementById('zzz'); /**
                                           * Created by haven on 16/9/18.
                                           */
// import Rx from 'rxjs/Rx'

_Rx.Observable.fromEvent(btn, 'click').subscribe(function () {
  return console.log('click!');
});