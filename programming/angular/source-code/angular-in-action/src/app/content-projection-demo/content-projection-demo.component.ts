import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-projection-demo',
  templateUrl: './content-projection-demo.component.html',
})
export class ContentProjectionDemoComponent implements OnInit {

  data = [
    {id: '' + Math.random(), name: '' + Math.random(), nation: '' + Math.random()},
    {id: '' + Math.random(), name: '' + Math.random(), nation: '' + Math.random()},
    {id: '' + Math.random(), name: '' + Math.random(), nation: '' + Math.random()},
    {id: '' + Math.random(), name: '' + Math.random(), nation: '' + Math.random()},
    {id: '' + Math.random(), name: '' + Math.random(), nation: '' + Math.random()},
  ]

  constructor() { }

  ngOnInit() {
  }

}
