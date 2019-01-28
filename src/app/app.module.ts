import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, EventEmitter } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';

import { WrapperComponent } from './wrapper/wrapper.component';
import { SlotComponent } from './slot/slot.component';

declare global {
    interface HTMLElementTagNameMap {
        'my-wrapper > my-slot': NgElement & WithProperties<{
            action: EventEmitter<string>,
            setInput(data: any): void
        }>;
        'my-wrapper': NgElement & WithProperties<{
            wrapperData: any
        }>;
    }
}

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
