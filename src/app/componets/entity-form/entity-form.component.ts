import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Entity } from '../../model/Entity';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-form',
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
  ],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {

  entities: Entity[] = [];

  constructor(private entityService: ApiService) { }

  ngOnInit(): void {
    this.entityService.getAllEntities().subscribe(
      data => this.entities = data,
      error => console.error('Error fetching entities:', error)
    );
  }
}
