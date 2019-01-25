import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotComponent implements OnInit {

    inputData: any = 'default input data';

    constructor(private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
    }

    @Input()
    // Important to use arrow function, to preserve this context
    setInput = (data) => {
        this.inputData = data;
        this.cd.detectChanges();
    }
}
