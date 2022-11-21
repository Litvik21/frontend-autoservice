import {Car} from "./car";

export interface CarOwner {
  id: bigint;
  cars: Array<Car>;
  orders: string;
}
