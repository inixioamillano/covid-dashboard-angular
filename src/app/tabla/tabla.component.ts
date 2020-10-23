import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() datos = [];

  constructor() {}

  ngOnInit(): void {
  }

}
