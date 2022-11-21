import { Component, OnInit } from '@angular/core';
import {CarOwner} from "../carOwner";
import {CarOwnerService} from "../carOwner.service";
import * as constants from "constants";
import * as path from "path";
import * as stream from "stream";

@Component({
  selector: 'app-car-owner',
  templateUrl: './car-owner.component.html',
  styleUrls: ['./car-owner.component.scss']
})
export class CarOwnerComponent implements OnInit {


  owners: CarOwner[] | undefined;

  constructor(private ownerService: CarOwnerService) { }

  ngOnInit() {
    this.getOrdersOfOwner();
  }

  getOrdersOfOwner(): void {
    this.ownerService.getOrdersOfOwner()
      .subscribe(owners => this.owners = owners);
  }

  add(cars: stream, orders: string,): void {
    cars = cars.pipe;
    orders = orders.trim();
    if (!cars && !orders) { return; }
    this.ownerService.addCarOwner({ cars, orders } as CarOwner)
      .subscribe(owner => {
        // @ts-ignore
        this.cars.push(owner);
      });
  }

}
