import {Car} from "./car";
import {Product} from "./product";
import {types} from "@angular/compiler-cli/linker/babel/src/babel_core";

export interface Order{
  id: bigint;
  car: Car;
  description: string;
  dateReceived: Date;
  tasks: Array<Task>;
  products: Array<Product>;
  status: types;
  totalPrice: number;
  dateFinished: Date;
}
