import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../model/User';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { AddCarrierDialogComponent } from '../add-carrier-dialog/add-carrier-dialog.component';
import { UpdateCarrierDialogComponent } from '../update-carrier-dialog/update-carrier-dialog.component';
import { CarrierService } from '../../services/carrier.service';
import { Carrier } from '../../model/Carrier ';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDialogModule,
    CommonModule,
    MatTableModule,
    AddCarrierDialogComponent,
    UpdateCarrierDialogComponent
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {
  carriers: Carrier[] = [];
  displayedColumns: string[] = ['id', 'salary', 'bban', 'from', 'to', 'rib', 'qualification','civil_Status','actions'];

  dataSource: MatTableDataSource<Carrier> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User },
              private carrierService: CarrierService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCarriers();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCarriers(): void {
    if (this.data.user.id) {
      this.carrierService.getCarriersByUserId(Number(this.data.user.id)).subscribe(
        (data: Carrier[]) => {
          this.carriers = data;
          this.dataSource.data = data;
        },
        (error) => {
          console.error('Error fetching carriers', error);
        }
      );
    }
  }

  addCarrier(): void {
    const dialogRef = this.dialog.open(UpdateCarrierDialogComponent, {
      width: '800px',
      data: { userId: this.data.user.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCarriers(); // Recharge les carrières après l'ajout
      }
    });
  }

  updateCarrier(carrier: Carrier): void {
    const dialogRef = this.dialog.open(UpdateCarrierDialogComponent, {
      width: '800px',
      data: { carrier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCarriers(); // Recharge les carrières après la mise à jour
      }
    });
  }

  deleteCarrier(id: number): void {
    this.carrierService.deleteCarrier(id).subscribe(
      () => {
        this.loadCarriers(); // Recharge les carrières après la suppression
      },
      (error) => {
        console.error('Error deleting carrier', error);
      }
    );
  }
}
