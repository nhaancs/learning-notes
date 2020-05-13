import { Component, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle-hooks-demo',
  templateUrl: './lifecycle-hooks-demo.component.html',
})
export class LifecycleHooksDemoComponent {
  name: string
  obj = {id: '123', position: 'leader'}

  a = "a"
  
  constructor() {
    // check string input changes
    // setInterval(() => {
    //   this.name = 'Nhan' + Math.random()
    // }, 10000) 
    /*
      ngOnChanges get called
      ngDoCheck get called
      ngAfterContentChecked get called
      ngAfterViewChecked get called
     */
    
    // check object input changes to new object
    // setInterval(() => {
    //   this.obj = {id: '333', position: 'aaa'}
    // }, 10000) 
    /*
      ngOnChanges get called
      ngDoCheck get called
      ngAfterContentChecked get called
      ngAfterViewChecked get called
     */

    // check object properties input changes
    // setInterval(() => {
    //   this.obj.id = '' + Math.random()
    // }, 10000) 
    /*
      ngDoCheck get called
      ngAfterContentChecked get called
      ngAfterViewChecked get called 
     */

    // setInterval(() => {
    //   this.a = '' + Math.random()
    // }, 10000)
  }

  ngOnInit() {
    console.log("Parent: ngOnInit get called")
  }

  ngOnChanges(changes: SimpleChanges) { 
    console.log("Parent: ngOnChanges get called", changes) 
  } 

  ngOnDestroy() {
    console.log("Parent: ngOnDestroy get called")
  }

  ngDoCheck() {
    console.log("Parent: ngDoCheck get called")
  }

  ngAfterContentInit() {
    console.log("Parent: ngAfterContentInit get called")
  }

  ngAfterContentChecked() {
    console.log("Parent: ngAfterContentChecked get called")
  }
  
  ngAfterViewInit() {
    console.log("Parent: ngAfterViewInit get called")
  }

  ngAfterViewChecked() {
    console.log("Parent: ngAfterViewChecked get called")
  }

}
