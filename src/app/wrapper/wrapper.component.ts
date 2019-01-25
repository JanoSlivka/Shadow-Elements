import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ViewEncapsulation,
    ChangeDetectorRef,
} from '@angular/core';

@Component({
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnInit, AfterViewInit {

    @Input('wrapper-data') wrapperData: any;
    private mySlotEl = document.querySelector('my-slot');

    constructor(
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        console.log(this.wrapperData);
    }

    ngAfterViewInit() {
        this.updateChildContent();
        this.mySlotEl.addEventListener('action', this.mySlotAction.bind(this));
    }

    ngOnDestroy() {
        this.mySlotEl.removeEventListener('action', this.mySlotAction.bind(this));
    }

    changeInputData(data) {
        this.wrapperData = data;
        this.updateChildContent();
        this.cd.detectChanges();
    }

    slotChange($event) {
        const assigned = $event.target.assignedNodes();
        if (assigned.length > 0) {
            console.log('my slot changed', assigned[0]);
        }
    }

    private mySlotAction(event) {
        console.log(event.detail);
        this.cd.detectChanges();
    }

    private updateChildContent() {
        if (!this.mySlotEl) return;
        this.mySlotEl.setInput(this.wrapperData);
    }

}
