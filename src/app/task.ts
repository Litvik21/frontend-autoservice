import {types} from "@angular/compiler-cli/linker/babel/src/babel_core";
import {Mechanic} from "./mechanic";

export interface Task  {
  id: bigint;
  typeOfTask: types;
  order: string;
  mechanic: Mechanic;
  price: number;
  paymentStatus: types;
}
