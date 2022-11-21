import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CarComponent } from './car/car.component';
import { MechanicComponent } from './mechanic/mechanic.component';
import { CarOwnerComponent } from './car-owner/car-owner.component';
import { TaskComponent } from './task/task.component';
import { OrderComponent } from './order/order.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CarComponent,
    MechanicComponent,
    CarOwnerComponent,
    TaskComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
