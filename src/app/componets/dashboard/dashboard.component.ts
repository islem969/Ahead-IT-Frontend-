import { Component, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../model/User';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { ɵ$localize } from '@angular/localize';
import {MatCardModule} from '@angular/material/card';
import { Entity } from '../../model/Entity';

import { ProfileService } from '../../services/profile.service';
import { Profil } from '../../model/Profil';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterOutlet,SideNavComponent,MatSidenavModule,
    MatFormFieldModule,
     MatInputModule, 
     MatTableModule,
      MatSortModule, 
      MatPaginatorModule,
      MatIconModule,
      
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 email = localStorage.getItem("email");
 firstName = localStorage.getItem("firstName");
 role = localStorage.getItem("role");

 public entity: any[] = [];

 profile: any = new Profil();
 id!: number;

 constructor(private http: HttpClient, private auth: AuthService, private api: ApiService, private profileServ : ProfileService){}

 ngOnInit() {
 this.id = parseInt(localStorage.getItem("id") || '0', 10); 
  this.loadUser();
  this.loadEntities();

  //this.dataSource.paginator = this.paginator;
} 
  logout(){
   
    this.auth.signOut();
  }
  loadEntities(): void {

    this.api.getEntity()
      .subscribe(
        data => {
          this.entity = data; // Assigner les données récupérées à la variable entities
          console.log(data)},
        
        error => {
          console.error('Erreur lors du chargement des entités :', error);
          // Gérer les erreurs si nécessaire
        }
      );
  }
  
  loadUser(): void { 
      this.profileServ.getUser(this.id).subscribe(
        data => {
          this.profile = data; // Assigner les données récupérées à la variable user
          console.log("PROFILE");
          console.log(data);
        },
        error => {
          console.error('Erreur lors du chargement des utilisateurs :', error);
          // Gérer les erreurs si nécessaire
        }
      );
    
  }
}
