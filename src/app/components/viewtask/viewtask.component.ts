import { Component, inject, OnInit, Signal } from '@angular/core';
import { Tasks } from 'src/app/interfaces/task.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.scss']
})
export class ViewtaskComponent implements OnInit{
  private store = inject(StoreService);
  dataTask!:Signal<Tasks[]>;
  ngOnInit(): void {
    this.dataTask = this.store.getData();
  }
}
