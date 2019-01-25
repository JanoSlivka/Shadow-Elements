import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';

@Component({
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotComponent implements OnInit {

    @Input() setInput = this.setInputData.bind(this);
    @Output() action = new EventEmitter<string>();

    clicks: number = 0;
    inputData: any = 'default input data';

    constructor(
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {}

    @HostListener('click')
    handleClick() {
        this.clicks++;
        this.action.emit('clicks: ' + this.clicks);
    }

    private setInputData(data) {
        this.inputData = data;
        this.cd.detectChanges();
    }
}
