import { Component, inject } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  standalone: true,
  selector: 'app-formtask',
  templateUrl: './formtask.component.html',
  styleUrls: ['./formtask.component.scss']
})
export class FormtaskComponent {
  private store = inject(StoreService);

  filterEstate(estado: string){
    this.store.setEstate(estado);
  }
}
