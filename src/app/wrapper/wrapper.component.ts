import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

@Component({
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnDestroy, OnInit {

  @Input('wrapper-data') wrapperData: any;
  clicks: 0;
  private mySlotEl;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.mySlotEl) {
      this.mySlotEl.removeEventListener('action', this.mySlotAction.bind(this));
    }
  }

  changeInputData(data) {
    this.wrapperData = data;
    this.updateChildContent();
    this.cd.detectChanges();
  }

  slotChange($event) {
    const assigned = $event.target.assignedNodes();
    if (assigned.length == 0) {
      console.log('No elements in wrapper...');
      return;
    }

    // Find my-slot in current wrapper (to search only in given host, not the whole document)
    this.mySlotEl = assigned.filter(_ => _.localName == 'my-slot')[0];
    console.log(this.mySlotEl);
    console.log(this.wrapperData);

    if (this.mySlotEl) {
      this.mySlotEl.addEventListener('action', this.mySlotAction.bind(this));
    }
  }

  private mySlotAction(event) {
    console.log(event.detail);
    this.clicks = event.detail;
    this.cd.detectChanges();
  }

  private updateChildContent() {
    if (!this.mySlotEl) return;
    this.mySlotEl.setInput(this.wrapperData);
  }

}
