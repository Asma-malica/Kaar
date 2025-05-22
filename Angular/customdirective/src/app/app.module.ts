import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
