import {  effect, inject, Injectable, signal } from "@angular/core";
import { Tasks } from "../interfaces/task.interface";

@Injectable({providedIn: 'root'})
export class StoreService {
  private data= signal<Tasks[]>([]);
  private dataFilter = signal<Tasks[]>([]);
  private estado = signal('todos');
  setData(dataServise:Tasks[]){
    this.data.set(dataServise);
    this.dataFilter.set(dataServise);
  }
  setEstate(estate:string){
    this.estado.set(estate);
    this.getData();
  }
  getData(){
    if(this.estado() != 'todos'){
      this.dataFilter.set(
        this.data().filter((e:Tasks)=>e.completed == !!this.estado())
      )
      return this.dataFilter;
    }
    this.dataFilter.set(this.data());
    return this.dataFilter;
  }
}
