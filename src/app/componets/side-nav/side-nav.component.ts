import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Router,RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

import {

  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatSidenavContent,
    DashboardComponent
    
    
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  constructor(private observer: BreakpointObserver,private router: Router ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.toggle();
      this.isCollapsed = false; 
    }
  }
  logout() {
    // Logique de déconnexion à implémenter ici
    console.log('User logged out');
    // Exemple : Redirection vers la page de connexion
     this.router.navigate(['/login']);
     localStorage.clear();
  }
  ​​}



