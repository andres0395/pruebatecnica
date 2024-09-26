import {  inject, Injectable, signal } from "@angular/core";
import { Tasks } from "../interfaces/task.interface";

@Injectable({providedIn: 'root'})
export class StoreService {
  private data= signal<Tasks[]>([]);

  setData(dataServise:Tasks[]){
    this.data.set(dataServise);
  }
  getData(){
    return this.data;
  }
}
