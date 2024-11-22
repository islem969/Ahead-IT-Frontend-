import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { SideNavComponent } from './componets/side-nav/side-nav.component';
import { TableComponent } from './componets/table/table.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { Menu } from './model/Menu';
import { MenuServiceService } from './menu-service.service';


@Component({
  selector: 'app-root',
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
    
    
  ],  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /*title = 'my-angular';
  showSidebar = true;
  isMobile= true;
  isCollapsed = true;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !event.url.includes('/login') && !event.url.includes('/signup');
      }
    });
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    // Logic to logout
  } */
    menus: Menu[] = [];
  isCollapsed: boolean = false;
  showSidebar: boolean = true;
  isMobile: boolean = false; // Remplacez par votre logique pour détecter les appareils mobiles
  profileId: any = localStorage.getItem("id"); // Vous devez remplacer ceci par l'ID réel du profil de l'utilisateur connecté

  constructor(private menuService: MenuServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadMenus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !event.url.includes('/login') && !event.url.includes('/signup');
      }
    });
    console.log(this.loadMenus);
    
  }

  // Méthode pour charger les menus selon le profil
  loadMenus() {
    this.menuService.getMenusByProfile(this.profileId).subscribe(
      (data) => {
        this.menus = data;
  
      },
      
      (error) => {
        console.error('Erreur lors du chargement des menus', error);
      }
    );
  }

  // Méthodes pour gérer l'interface utilisateur
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    // Votre logique de déconnexion ici
  }
}
