import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, EventEmitter } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SlotComponent } from './slot/slot.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { AppComponent } from './app.component';

declare global {
  interface HTMLElementTagNameMap {
    'my-slot': NgElement & WithProperties<{
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
    WrapperComponent,
    // AppComponent,
  ],
  entryComponents: [
    SlotComponent,
    WrapperComponent,
    // AppComponent
  ],
  // schemas: [
  //     CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap(app) {
    const elements: any[] = [
      [SlotComponent, 'my-slot'],
      [WrapperComponent, 'my-wrapper'],
    ];

    for (const [component, name] of elements) {
      const el = createCustomElement(component, { injector: this.injector });
      customElements.define(name, el);
    }

    // // create DOM element for the component being bootstrapped
    // // and add it to the DOM
    // const componentElement = document.createElement('app-root');
    // document.body.appendChild(componentElement);
    // // bootstrap the application with the component
    // app.bootstrap(AppComponent);
  }
}
