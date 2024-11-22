import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profil } from '../model/Profil';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
private baseUrl5:string="http://localhost:5079/api/Utilisateur"
private baseUrl8:string="http://localhost:5079/profil"
  constructor(private http: HttpClient) { }
  
  getUser(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.baseUrl5}/${id}`);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl8}/${id}`);
  }
}
