import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';

declare global {
    interface HTMLElementTagNameMap {
        'my-slot': NgElement & WithProperties<{ setInput(data: any): void }>;
    }
}

@Component({
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class WrapperComponent implements OnInit, AfterViewInit {

    private data;

    @Input('wrapper-data') set wrapperData(input) {
        console.log('wrapper input data', input)
        this.data = input;
    };
    get wrapperData() {
        return this.data;
    }

    constructor() { }

    ngOnInit() {}

    ngAfterViewInit() {
        this.updateChildContent();
    }

    changeInputData() {
        this.wrapperData = 'Changed Data';
        this.updateChildContent();
    }

    slotChange($event) {
        const assigned = $event.target.assignedNodes();
        if (assigned.length > 0) {
            console.log('shotchange', assigned[0]);
        }
    }

    private updateChildContent() {
        const mySlot = document.querySelector('my-slot');
        if (mySlot) mySlot.setInput(this.wrapperData);
    }

}
