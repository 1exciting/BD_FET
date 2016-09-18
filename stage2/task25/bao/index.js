/**
 * Created by haven on 16/9/18.
 */
// import Rx from 'rxjs/Rx'
import {Observable} from 'rxjs/Rx'

// Observble.of(1,2,3).map(x=>x+'!!!').forEach()


const btn = document.getElementById('zzz')
Observable.fromEvent(btn, 'click')
	.subscribe(()=>console.log('click!'))