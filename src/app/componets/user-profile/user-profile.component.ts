import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ 

    CommonModule,
    RouterOutlet,
    SideNavComponent,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconButton,
    MatIconModule
    
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User = new User() ;
  id!: number;
  passwordVisible = false;
  constructor(
    private http: HttpClient,
    private profileServ: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const idParam = localStorage.getItem("id");
    if (idParam !== null) {
      const id = +idParam;
      this.profileServ.getUserById(id).subscribe(data => {
        this.user = data;
      });
    } else {
      console.error('ID param is null');
    }
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Propriété calculée pour obtenir la valeur du mot de passe
  get passwordDisplay(): string {
    return this.user?.password || '';
  }
  }


