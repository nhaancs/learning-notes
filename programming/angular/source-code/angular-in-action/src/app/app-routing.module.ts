import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LifecycleHooksDemoComponent } from './lifecycle-hooks-demo/lifecycle-hooks-demo.component';
import { ContentProjectionDemoComponent } from './content-projection-demo/content-projection-demo.component';


const routes: Routes = [
  {
    path: 'lifecycle-hooks',
    component: LifecycleHooksDemoComponent
  },
  {
    path: 'content-projection',
    component: ContentProjectionDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
