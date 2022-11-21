import { Component, OnInit } from '@angular/core';
import {Car} from "../car";
import {CarService} from "../car.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  cars: Car[] | undefined;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars);
  }

  add(brand: string, model: string, year: string, number: string, carOwner: string): void {
    brand = brand.trim();
    model = model.trim();
    year = year.trim();
    number = number.trim();
    carOwner = carOwner.trim();
    if (!brand && !model && !year && !number && !carOwner) { return; }
    this.carService.addCar({ brand, model, year, number, carOwner } as Car)
      .subscribe(car => {
        // @ts-ignore
        this.cars.push(car);
      });
  }
}
