import { Component, OnInit, SimpleChanges, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LifecycleChildComponent implements OnInit {
  @Input() name: string
  @Input() obj: Object
  
  constructor() {
    console.log("constructor get called")

    // setInterval(() => {
    //   this.name = '' + Math.random()
    // }, 10000)
  }

  ngOnInit() {
    console.log("Child: ngOnInit get called")
  }

  ngOnChanges(changes: SimpleChanges) { 
    console.log("Child: ngOnChanges get called", changes) 
  } 

  ngOnDestroy() {
    console.log("Child: ngOnDestroy get called")
  }

  ngDoCheck() {
    console.log("Child: ngDoCheck get called")
  }

  ngAfterContentInit() {
    console.log("Child: ngAfterContentInit get called")
  }

  ngAfterContentChecked() {
    console.log("Child: ngAfterContentChecked get called")
  }
  
  ngAfterViewInit() {
    console.log("Child: ngAfterViewInit get called")
  }

  ngAfterViewChecked() {
    console.log("Child: ngAfterViewChecked get called")
  }

}
