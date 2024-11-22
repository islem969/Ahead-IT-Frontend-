import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { Entity } from '../model/Entity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private baseUrl:string= "http://localhost:5079/api/User/"
private baseUrl1:string="http://localhost:5079/api/User/register/"
private baseUrl2:string="http://localhost:5079/api/Utilisateur"
private baseUrl3:string= "http://localhost:5079/api/User"
private baseUrl4:string="http://localhost:5079/api/EntityDto/entitydto"
private baseUrl5:string="http://localhost:5079/api/Utilisateur"
private baseUr6:string="http://localhost:5079/api/EntityDto/entity"

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  addUsers(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.baseUrl1, user);
  }
  deleteUser(id: number): Observable<User[]> {
    const url = `${this.baseUrl2}/${id}`;
    return this.http.delete<User[]>(url);
  }
  updateUser(id: number, updatedUser: User) {
    const url = `${this.baseUrl3}/${id}`;
    return this.http.put<User>(url, updatedUser);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl3}/${id}`);
  }

  getEntity():Observable<Entity[]> {
    return this.http.get<Entity[]>(this.baseUrl4);
  }
  
  getAllEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.baseUr6);
  }


}
