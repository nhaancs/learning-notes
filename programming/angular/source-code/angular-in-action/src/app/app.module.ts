import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LifecycleHooksDemoComponent } from './lifecycle-hooks-demo/lifecycle-hooks-demo.component';
import { LifecycleChildComponent } from './lifecycle-hooks-demo/lifecycle-child/lifecycle-child.component';
import { ContentProjectionDemoComponent } from './content-projection-demo/content-projection-demo.component';
import { TableComponent } from './content-projection-demo/table/table.component';
import { TableRowComponent } from './content-projection-demo/table-row/table-row.component';
import { NameCardComponent } from './content-projection-demo/name-card/name-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LifecycleHooksDemoComponent,
    LifecycleChildComponent,
    ContentProjectionDemoComponent,
    TableComponent,
    TableRowComponent,
    NameCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA] 
})
export class AppModule { }
