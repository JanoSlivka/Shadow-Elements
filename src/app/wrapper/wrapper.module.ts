import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { WrapperComponent } from './wrapper.component';
import { SlotComponent } from './slot/slot.component';


@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [WrapperComponent, SlotComponent],
    providers: [],
    entryComponents: [WrapperComponent]
})
export class WrapperModule {

    constructor(private injector: Injector) { }

    ngDoBootstrap() {
        const wrapperComponent = createCustomElement(WrapperComponent, {
            injector: this.injector
        });
        const slotComponent = createCustomElement(SlotComponent, {
            injector: this.injector
        });


        customElements.define('my-slot', slotComponent);
        customElements.define('my-wrapper', wrapperComponent);
    }
}
