import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { delay } from 'rxjs';
import { mergeMap } from 'rxjs';
import { exhaustMap } from 'rxjs';
import { takeWhile } from 'rxjs';
import { first } from 'rxjs';
import { single } from 'rxjs';
import { skipWhile } from 'rxjs';
import { scan } from 'rxjs';
import { delayWhen } from 'rxjs';
import { interval } from 'rxjs';
import { retryWhen } from 'rxjs';
import { tap } from 'rxjs';
import { retry } from 'rxjs';
import { timer } from 'rxjs';
import { reduce } from 'rxjs';
import { skipLast } from 'rxjs';
import { skip } from 'rxjs';
import { last } from 'rxjs';
import { takeLast } from 'rxjs';
import { take } from 'rxjs';
import { concatMap } from 'rxjs';
import { switchMap } from 'rxjs';
import { AsyncSubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs';
import { map } from 'rxjs';
import { fromEvent } from 'rxjs';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'Observables';

  array1 = [1,2,3,4,5];
  array2 = ['A','B','C','D','E'];

  // of operator
  myObservable1 = of(this.array1);

  getData1(){
    this.myObservable1.subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err) => {
        console.log(err.message);
      },
      complete() {
        alert('All data is streamed..')
      },
    })
  }

  // from operator
  myObservable2 = from(this.array1)

  getData2(){
    this.myObservable2.subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err) => {
        console.log(err.message);
      },
      complete() {
        alert('All data is streamed..')
      },
    })
  }

  // from operator is suitable for converting the promise to observable
  myPromise = new Promise((resolve, reject) => {
    resolve([10, 20, 30, 40, 50]);
  })

  myObservable3 = from(this.myPromise);

  getData3(){
    this.myObservable3.subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err) => {
        console.log(err.message);
      },
      complete() {
        alert('All data is streamed..')
      },
    })
  }

  // From Event Operator

  @ViewChild('createbtn') createBtn: ElementRef;

  createBtnObs;

  buttonClicked() {
    let count = 0;
    this.createBtnObs = fromEvent(this.createBtn.nativeElement, 'click').subscribe((data) => {
      console.log(data);
      this.showItem(++count);
    })
  }

  ngAfterViewInit(){
    this.buttonClicked();
  }

  showItem(val) {
    let div = document.createElement('div');
    div.innerText = 'Item' + val;
    document.getElementById('content').appendChild(div);
  }

  // Map Operator

  myObservable4 = from([1,2,3,4,5]);

  mapObs = this.myObservable4.pipe(map((val)=> {
    return val * 5;
  }))

  getData4(){
    this.mapObs.subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err) => {
        console.log(err.message);
      },
      complete() {
        alert('All data is streamed..')
      },
    })
  }

  // Filter Operator

  myObservable5 = from([2,4,6,8,10,12]);

  filterObs = this.myObservable5.pipe(filter((val)=> {
    return val % 4 == 0;
  }))

  getData5(){
    this.filterObs.subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err) => {
        console.log(err.message);
      },
      complete() {
        alert('All data is streamed..')
      },
    })
  } 

  // ngOnInit(): void {

    // Behaviour subject
    // const subject = new BehaviorSubject(500);

    // // Replay subject used to retrieve the old values
    // const subject = new ReplaySubject();

    // subject.next(100);
    // subject.next(200);


    // // Subscriber 1
    // subject.subscribe((data)=> {console.log('Subscriber 1 :' + data)})

    // // Subscriber 2
    // subject.subscribe((data)=> {console.log('Subscriber 2 :' + data)})

    // subject.next(300);

    // // Subscriber 3
    // subject.subscribe((data)=> {console.log('Subscriber 3 :' + data)})

  // }

  // ngOnInit(): void {

  //    //Async Subject used for retreiving the latest value
  //    const asyncSub = new AsyncSubject();

  //    asyncSub.next(100);
  //    asyncSub.next(200);
  //    asyncSub.next(300);
  //    asyncSub.complete(); // Async subject works only when there is complete method

  //    asyncSub.subscribe((data)=> {console.log('Subscriber 1 :' + data)})

  //   this.source.subscribe((data)=> {console.log(data + ' take')});
  //   this.source2.subscribe((data)=> {console.log(data + ' takeWhile')});
  //   this.source3.subscribe((data)=> {console.log(data + ' takeLast')});
    
  // }

  // ngOnInit(): void {

  //   // first, last and single
  //   this.nums.subscribe((data)=> {console.log(data + ' first')});
  //   this.nums2.subscribe((data)=> {console.log(data + ' last')});
  //   this.nums3.subscribe((data)=> {console.log(data + ' single')});
    
  // }

  // ngOnInit(): void {

  //    // skip, skipUntil, skipWhile, skipLast
  //    this.skip1.subscribe((val)=> {console.log(val + ' skip')});
  //    this.skip2.subscribe((val)=> {console.log(val + ' skipWhile')});
  //    this.skip3.subscribe((val)=> {console.log(val + ' skipLast')});
    
  // }
    
  // ngOnInit(): void {

  //   // scan and reduce
  //   this.scans.subscribe((res)=> {console.log(res + ' Scan')});
  //   this.reduces.subscribe((res)=> {console.log(res + ' Reduce method')});
    
  // }

  ngOnInit(): void {

    //delay and delayWhen
    this.delay1.subscribe((res)=> {console.log(res + ' delay')});
    this.delay2.subscribe((res)=> {console.log(res + ' delayWhen')});
    
  }

  // ngOnInit(): void {

  //   // retry and retryWhen
  //   this.retry1.subscribe((val)=> {console.log(val)});
  //   this.retry2.subscribe((val)=> {console.log(val)});
    
  // }

  //  // Switch map, Concat map, Merge map, Exhaust map

  //  constructor(){
  //   const example = (operator: any) => () => {
  //     from([0, 1, 2, 3, 4, 5])
  //       .pipe(operator((x: any) => of(x).pipe(delay(500))))
  //       .subscribe(console.log,
  //         () => {},
  //         () => console.log(`${operator.name} completed`) 
  //       );
  //   };
  //   example(exhaustMap)();
  //  }

  // take, takeUntil, takeWhile, takeLast
  source = of(1, 2, 3, 4, 5).pipe(take(3));
   
  source2 = of(1, 2, 3, 4, 5).pipe(takeWhile(val => val < 4));

  source3 = of(1, 2, 3, 4, 5).pipe(takeLast(2));

  // first, last and single
  nums = of(1, 2, 3, 4, 5).pipe(first(val => val > 3));

  nums2 = of(1, 2, 3, 4, 5).pipe(last(val => val > 3));

  nums3 = of(1, 2, 3, 4, 3).pipe(single(val => val == 3));

  // skip, skipUntil, skipWhile, skipLast
  skip1 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(skip(4));

  skip2 = of(1, 2, 3, 4, 5).pipe(skipWhile(val => val < 3));

  skip3 = of(1, 2, 3, 4, 5, 6, 7, 8).pipe(skipLast(5));

  //scan and reduce 
  scans = of(1, 2, 3, 4, 5).pipe(scan((acc,val)=> acc + val, 0));

  reduces = of(1, 2, 3, 4, 5).pipe(reduce((acc,val)=> acc + val, 0));

  //delay and delayWhen
  delay1 = of(1, 2, 3, 4, 5).pipe(delay(1000));

  delay2 = of(1, 2, 3, 4, 5).pipe(delayWhen(val => timer(val * 1000)));

  // retry and retryWhen
  retry1 = interval(1000).pipe(map(val => {
    if (val > 2) throw new Error("Invalid value");
    return val;
  }),
  retry(1));

  retry2 = interval(1000).pipe(map(val => {
    if (val > 2) throw new Error("Invalid value");
    return val;
  }),
  retryWhen(err => err.pipe(tap(()=> console.log("Retrying..")))));
}
