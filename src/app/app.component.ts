import { Component, OnInit,Injector, Signal } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { Tasks } from './interfaces/task.interface';
import { initFlowbite } from 'flowbite';
import { StoreService } from './services/store.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data!:Signal<Tasks[]>;
  today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0');
  constructor(private databaseService: DatabaseService,private store:StoreService) {}

  async ngOnInit() {
    initFlowbite();
    const res:Tasks[] = await this.databaseService.getData();
    res.forEach((task:Tasks)=>{
      task.personsAsociate = [];
      task.dateLimit = this.today;
    });
    this.store.setData(res.slice(0,10));
  }
}
