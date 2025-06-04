import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lazyloading1Component } from './lazyloading1.component';

const routes: Routes = [{ path: '', component: Lazyloading1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lazyloading1RoutingModule { }
