import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrier } from '../model/Carrier ';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {
  private apiUrl = "http://localhost:5079/api/Career";
  
  private basUrl = "http://localhost:5079/api/Career";


  constructor(private http: HttpClient) { }

  getAllCarriers(): Observable<Carrier[]> {
    return this.http.get<Carrier[]>(this.apiUrl);
  }
  getCarriersByUserId(userId: number): Observable<Carrier[]> {
    return this.http.get<Carrier[]>(`${this.apiUrl}/user/${userId}`);
  }

  addCarrier(carrier: Carrier): Observable<Carrier> {
    return this.http.post<Carrier>(this.basUrl, carrier);
  }
  updateCarrier(id: number, carrier: Carrier): Observable<Carrier> {
    return this.http.put<Carrier>(`${this.apiUrl}/${id}`, carrier);
  }
  // Méthode pour supprimer une carrière
  deleteCarrier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
