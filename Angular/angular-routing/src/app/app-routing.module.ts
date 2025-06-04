import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {path : "", redirectTo : "/home",pathMatch:'full'},
  // {path : "", component : HomeComponent},
  {path : "home", component : HomeComponent},
  {path : "contact", component : ContactComponent},
  {path : "about/:id", component : AboutComponent},
  {path : "lazyloading1",
    loadComponent: () => {
  return import('./lazyloading1/lazyloading1.component').then(m => m.Lazyloading1Component)
}

  },
 
  // {path : "lazyloading2", component : Lazyloading2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
