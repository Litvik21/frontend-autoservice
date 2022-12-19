import { Component, OnInit } from '@angular/core';
import {Task} from "../model/task";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../service/task.service";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaymentStatus} from "../model/paymentStatus";

@Component({
  selector: 'app-task-update-status',
  templateUrl: './task-update-status.component.html',
  styleUrls: ['./task-update-status.component.scss']
})
export class TaskUpdateStatusComponent implements OnInit {
  statusForm!: FormGroup;

  statuses: string[] = [];
  task!: Task;
  status!: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTask();
    for (let i = 0; i < 2; i++) {
      this.statuses.push(PaymentStatus[i].toString());
    }
    this.statusForm = this.fb.group({
      status: [null]
    })
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  submitStatus() {
    this.status = this.statusForm.value
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.taskService.updateStatus(this.task.id!, this.status)
      .subscribe(() => this.goBack());
  }
}
