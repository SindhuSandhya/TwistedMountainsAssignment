import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../models/user.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Users {

  constructor(private httpClient: HttpClient){}

  getUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(`${environment.apiUrl}`);
  }

  // getUserById(id: string) {
  //   const url = `${environment.apiUrl}/api/users/${id}`;
  //   return this.httpClient.get(url);
  // }

}
