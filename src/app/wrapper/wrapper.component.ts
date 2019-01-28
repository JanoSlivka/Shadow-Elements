import {
    AfterViewInit,
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
export class WrapperComponent implements AfterViewInit, OnDestroy, OnInit {

    @Input('wrapper-data') wrapperData: any;
    private mySlotEl = document.querySelector('my-wrapper > my-slot');

    constructor(
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        console.log(this.wrapperData);
    }

    ngAfterViewInit() {
        this.updateChildContent();
        if (this.mySlotEl) {
            this.mySlotEl.addEventListener('action', this.mySlotAction.bind(this));
        }
    }

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
