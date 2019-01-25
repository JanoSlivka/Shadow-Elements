import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';

import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { WrapperComponent } from './wrapper/wrapper.component';
import { SlotComponent } from './slot/slot.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        SlotComponent,
        WrapperComponent
    ],
    entryComponents: [
        SlotComponent,
        WrapperComponent
    ],
    providers: [],
})
export class AppModule {
    constructor(private injector: Injector) {}

    ngDoBootstrap() {
        const slotComponent = createCustomElement(SlotComponent, {
            injector: this.injector
        });
        const wrapperComponent = createCustomElement(WrapperComponent, {
            injector: this.injector
        });

        customElements.define('my-slot', slotComponent);
        customElements.define('my-wrapper', wrapperComponent);
    }
}
