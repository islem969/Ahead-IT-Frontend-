import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string= "http://localhost:5079/api/User/"
  constructor(private http : HttpClient, private router: Router) { }

  /*getUsers(){
    return this.http.get<any>(this.baseUrl);
  }*/

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)

  }
  login(loginObj:any){

    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)

  }
  authenticate(loginObj:any) {
    return this.http
      .post<any>(`${this.baseUrl}authenticate`,loginObj)
      .pipe(
        map(userData => {  
          localStorage.setItem("email", loginObj.username);
          localStorage.setItem("firstName", loginObj.username);
           localStorage.setItem("token", userData.token); 
           localStorage.setItem("role", userData.role); 
           localStorage.setItem("id", userData.id); 
          return userData;
        })
      );
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token' ,tokenValue)
  }
  
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

    signOut(){
      localStorage.clear();
      
      this.router.navigate(['login'])
    }
}
