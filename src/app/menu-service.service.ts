import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from './model/Menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
 private baseUrl ="http://localhost:5079/api/Menu/GetMenusByProfile"

  constructor(private  http : HttpClient) { }

  getMenusByProfile(profileId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl}/${profileId}`);
  }
}
