import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log();
  }

  slotChange($event) {
    const assigned = $event.target.assignedNodes();
    if (assigned.length > 0) {
      console.log('shotchange', assigned[0]);
    }
  }

}
