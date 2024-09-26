import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './services/database.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StoreService } from './services/store.service';
import { FormtaskComponent } from './components/formtask/formtask.component';
import { ViewtaskComponent } from './components/viewtask/viewtask.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FormtaskComponent,
    ViewtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatabaseService,{ provide: LocationStrategy, useClass: HashLocationStrategy },StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
