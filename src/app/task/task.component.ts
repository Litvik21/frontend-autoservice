import {Component, OnInit} from '@angular/core';
import {Task} from "../model/task";
import {TaskService} from "../service/task.service";
import {Mechanic} from "../model/mechanic";
import {OrderService} from "../service/order.service";
import {MechanicService} from "../service/mechanic.service";
import {Order} from "../model/order";
import {PaymentStatus} from "../model/paymentStatus";
import {TypeOfTask} from "../model/typeOfTask";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  orderForm!: FormGroup;
  mechanicForm!: FormGroup;

  tasks: Task[] = [];
  orders: Order[] = [];
  mechanics: Mechanic[] = [];
  paymentStatuses: string[] = [];
  types: string[] = [];
  newMechanic!: Mechanic;
  newOrder!: Order;
  paymentStatus!: PaymentStatus;

  typeID = 0;
  price = 0;
  statusID = 0;

  constructor(private taskService: TaskService,
              private orderService: OrderService,
              private mechanicService: MechanicService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getOrders();
    this.getMechanics();
    this.getTasks();
    this.mechanicForm = this.fb.group({
      mechanic: [null]
    })
    this.orderForm = this.fb.group({
      order: [null]
    })
    for (let i = 0; i < 2; i++) {
      this.paymentStatuses.push(PaymentStatus[i].toString());
    }
    for (let i = 0; i < 4; i++) {
      this.types.push(TypeOfTask[i].toString());
    }
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  getMechanics(): void {
    this.mechanicService.getMechanics()
      .subscribe(mechanics => this.mechanics = mechanics);
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  submitMechanic() {
    this.newMechanic = this.mechanics.find(m => m.id == this.mechanicForm.value)!
  }

  submitOrder() {
    this.newOrder = this.orders.find(o => o.id == this.orderForm.value)!
  }

  add(): void {
    let id = Math.max.apply(Math, this.tasks.map(function (o) {return o.id!;} ));

    this.taskService.addTask({id: id + 1, typeOfTask: TypeOfTask[this.typeID], price: this.price,
      order: this.newOrder, mechanic: this.newMechanic, paymentStatus: PaymentStatus[this.statusID]}as unknown as Task)
      .subscribe(task => {this.tasks.push(task)});

    this.typeID = 0;
    this.statusID = 0;
    this.price = 0;
  }
}
