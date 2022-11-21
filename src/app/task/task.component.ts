import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";
import {types} from "@angular/compiler-cli/linker/babel/src/babel_core";
import {Mechanic} from "../mechanic";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks: Task[] | undefined;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  add(type: types, order: string, mechanic: Mechanic, price: number, paymentStatus: types): void {
    price = price.valueOf();
    this.taskService.addTask({type, order, mechanic, price, paymentStatus} as Task)
      .subscribe(task => {
        // @ts-ignore
        this.tasks.push(task);
      });
  }
}
