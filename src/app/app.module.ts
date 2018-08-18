import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxExtensionsInputsModule } from './inputs/inputs.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxExtensionsInputsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
