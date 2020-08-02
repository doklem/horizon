import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DayTimeAnimationsDirective } from './directives/day-time-animations.directive';

@NgModule({
  declarations: [
    AppComponent,
    DayTimeAnimationsDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
