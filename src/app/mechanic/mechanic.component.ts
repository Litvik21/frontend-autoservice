import { Component, OnInit } from '@angular/core';
import {Mechanic} from "../mechanic";
import {MechanicService} from "../mechanic.service";

@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.component.html',
  styleUrls: ['./mechanic.component.scss']
})
export class MechanicComponent implements OnInit {

  mechanics: Mechanic[] | undefined;

  constructor(private mechanicService: MechanicService) { }

  ngOnInit() {
    this.getMechanics();
  }

  getMechanics(): void {
    this.mechanicService.getMechanics()
      .subscribe(mechanics => this.mechanics = mechanics);
  }

  add(name: string, finishedOrders: string): void {
    name = name.trim();
    finishedOrders = finishedOrders.trim();
    if (!name && !finishedOrders) { return; }
    this.mechanicService.addMechanic({ name, finishedOrders } as Mechanic)
      .subscribe(mechanic => {
        // @ts-ignore
        this.mechanics.push(mechanic);
      });
  }
}
