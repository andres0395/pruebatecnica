import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { Tasks } from 'src/app/interfaces/task.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  standalone: true,
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.scss'],
  imports:[NgIf,NgFor]
})
export class ViewtaskComponent implements OnInit{
  private store = inject(StoreService);
  dataTask!:Signal<Tasks[]>;
  selectTask!:Tasks;
  ngOnInit(): void {
    this.dataTask = this.store.getData();
  }
  selectModalTask(task:Tasks): void{
    this.selectTask = task;
  }
  changeCompletedTask(task:Tasks): void {
    task.completed = true;
  }
}
