import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DawnDuskAnimationDirective } from './directives/dawn-dusk-animation.directive';
import { DailyAnimationDirective } from './directives/daily-animation.directive';

@NgModule({
  declarations: [
    AppComponent,
    DailyAnimationDirective,
    DawnDuskAnimationDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
