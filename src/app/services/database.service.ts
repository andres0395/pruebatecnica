// database.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, } from '@angular/core';
import { Tasks } from '../interfaces/task.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DatabaseService {
  private readonly url ='https://jsonplaceholder.typicode.com/todos';
  private http = inject(HttpClient);
  async getData(){
    return await firstValueFrom(this.http.get<Tasks[]>(this.url));
  }
}
