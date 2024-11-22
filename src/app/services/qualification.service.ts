import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qualification } from '../model/Qualification';
import { civil_Status } from '../model/Civil_Status';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  private BaseUrl ="http://localhost:5079/api/Qualifications"
  private BaseUrl1= "http://localhost:5079/api/Status"

  constructor(private http :HttpClient ) { }
  getAllQualifications(): Observable<qualification[]> {
    return this.http.get<qualification[]>(this.BaseUrl);
  }

  getAllStatus(): Observable<civil_Status[]> {
    return this.http.get<civil_Status[]>(this.BaseUrl1);
  }
}
