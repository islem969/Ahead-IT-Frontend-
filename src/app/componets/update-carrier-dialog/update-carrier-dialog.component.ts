import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarrierService } from '../../services/carrier.service';
import { Carrier } from '../../model/Carrier ';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QualificationService } from '../../services/qualification.service';
import { qualification } from '../../model/Qualification';
import { civil_Status } from '../../model/Civil_Status';

@Component({
  selector: 'app-update-carrier-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
     MatIconModule,
     MatDatepickerModule,
     ReactiveFormsModule,
     MatSelectModule,
     MatCheckboxModule,
     MatNativeDateModule,
     MatDialogModule],
  templateUrl: './update-carrier-dialog.component.html',
  styleUrl: './update-carrier-dialog.component.css'
})
export class UpdateCarrierDialogComponent {
  isUpdateMode: boolean = false;   
  carrierForm!: FormGroup;
  qualifications: qualification[] = [];
  civil_Statuss: civil_Status[] = [];
  constructor(
    private fb: FormBuilder,
    private carrierService: CarrierService,
    private dialogRef: MatDialogRef<UpdateCarrierDialogComponent>,private qualificationService : QualificationService,
    @Inject(MAT_DIALOG_DATA) public data: { carrier: Carrier , userId: number}
  ) {
   
  }

  ngOnInit(): void { 
    this.isUpdateMode = !!this.data.carrier;  // Check if data.carrier is provided
    this.initializeForm();
    this.loadQualifications();
    this.loadStatus();
} 
initializeForm(): void {
  
  this.carrierForm = this.fb.group({
    id: [this.data.carrier?.id || null],
    salary: [this.data.carrier?.salary || '', Validators.required],
    bban: [this.data.carrier?.bban || '', Validators.required],
    from: [this.data.carrier?.from || null, Validators.required],
    to: [this.data.carrier?.to || null],
    rib: [this.data.carrier?.rib || '', Validators.required],
    qualificationId: [this.data.carrier?.qualificationId || '', Validators.required],
    civil_StatusId: [this.data.carrier?.civil_StatusId || '', Validators.required],
  });
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
      this.carrierService.updateCarrier(this.carrierForm.value.id, this.carrierForm.value).subscribe(
        result => this.dialogRef.close(result),
        error => console.error('Error updating carrier', error)
      );
    } else {
      this.carrierService.addCarrier(this.carrierForm.value).subscribe(
        result => this.dialogRef.close(result),
        error => console.error('Error adding carrier', error)
      );
    }
  }
}

onCancel(): void {
  this.dialogRef.close();
}
}
