import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarrierService } from '../../services/carrier.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Carrier } from '../../model/Carrier ';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { qualification } from '../../model/Qualification';
import { QualificationService } from '../../services/qualification.service';
import { civil_Status } from '../../model/Civil_Status';

@Component({
  selector: 'app-add-carrier-dialog',
  standalone: true,
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
     MatIconModule,
     MatDatepickerModule,
     MatSelectModule,
     MatCheckboxModule,
     MatNativeDateModule,
     MatDialogModule],  providers: [  
      MatDatepickerModule,  
    ],
  templateUrl: './add-carrier-dialog.component.html',
  styleUrl: './add-carrier-dialog.component.css'
})
export class AddCarrierDialogComponent  implements OnInit{
  qualifications: qualification[] = [];
  civil_Statuss: civil_Status[] = [];

  carrierForm: FormGroup;
  isUpdateMode: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private carrierService: CarrierService,private qualificationService : QualificationService,
    private dialogRef: MatDialogRef<AddCarrierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { carrier?: Carrier, userId: number }
  ) {
    this.isUpdateMode = !!data.carrier;
    this.carrierForm = this.fb.group({
      id: [data.carrier?.id],
      salary: [data.carrier?.salary || '', Validators.required],
      bban: [data.carrier?.bban || '', Validators.required],
      from: [data.carrier?.from || '', Validators.required],
      to: [data.carrier?.to || ''],
      rib: [data.carrier?.rib || '', Validators.required],
      qualificationId: [data.carrier?.qualificationId || '', Validators.required],
      civil_StatusId: [data.carrier?.civil_StatusId || '', Validators.required],
      userId: [data.userId]
    });
  }

  ngOnInit(): void {
    this.loadQualifications();
    this.loadStatus();
  }

  loadQualifications(): void {
    this.qualificationService.getAllQualifications().subscribe(
      (data: qualification[]) => {
        this.qualifications = data;
      },
      error => {
        console.error('Error loading qualifications', error);
      }
    );
  }

  loadStatus(): void {
    this.qualificationService.getAllStatus().subscribe(
      (data: civil_Status[]) => {
        this.civil_Statuss = data;
      },
      error => {
        console.error('Error loading qualifications', error);
      }
    );
  }
  onSubmit(): void {
    
    if (this.carrierForm.valid) {
      if (this.isUpdateMode) {
        this.carrierService.updateCarrier(this.data.carrier!.id, this.carrierForm.value).subscribe(
          result => this.dialogRef.close(result),
          error => console.error('Error updating carrier', error)
        );
      } else {
        this.carrierService.addCarrier(this.carrierForm.value).subscribe(
          result => this.dialogRef.close(result),
          error => console.error('Error creating carrier', error)
          
        );
        console.log(this.carrierForm.value)

      }
    }
  }
}
