import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ChildComponent } from './child/child.component';
import { NgAfterContentInitComponent } from './ng-after-content-init/ng-after-content-init.component';
import { NgAfterViewInitComponent } from './ng-after-view-init/ng-after-view-init.component';
import { NgOnDestroyComponent } from './ng-on-destroy/ng-on-destroy.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    ChildComponent,
    NgAfterContentInitComponent,
    NgAfterViewInitComponent,
    NgOnDestroyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
