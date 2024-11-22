import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { publicDecrypt } from 'crypto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from '../table/table.component';
 

@Component({
  selector: 'app-dialog-mod',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
     MatInputModule, 
     MatIconModule,
     MatDatepickerModule,
     ReactiveFormsModule,
     MatSelectModule,
     MatCheckboxModule,
     MatNativeDateModule,

  ],
  templateUrl: './dialog-mod.component.html',
  styleUrl: './dialog-mod.component.css'
})
export class DialogModComponent implements OnInit {
  userForm!: FormGroup;
  user: User = new User();
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,private dialogRef: MatDialogRef<DialogModComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting dialog data
  ) {
    this.userForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cin: [null, Validators.required],
      cnss: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      Sex: [null, Validators.required],
      birthdate: [],
      hiringdate: []
    });

    if (data && data.id) {
      this.id = data.id;
    } else {
      this.route.paramMap.subscribe(params => {
        this.id = +params.get('id')!;
      });
    }
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    if (this.id) {
      this.api.getUser(this.id).subscribe((user: User) => {
        this.userForm.patchValue({
          lastName: user.lastName,
          firstName: user.firstName,
          email: user.email,
          
          Sex: user.sex,
          cin: user.cin ? user.cin.toString() : '',
          cnss: user.cnss ? user.cnss.toString() : '',
          phoneNumber: user.phoneNumber ? user.phoneNumber.toString() : '',
          hiringdate: user.hiringdate ? new Date(user.hiringdate) : null,
          birthdate: user.birthdate ? new Date(user.birthdate) : null
        });
    console.log(user);

      });
}
    
  }
  

  submit() {
    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };

     
      formData.id = this.id;
console.log(formData)
      this.api.updateUser(this.id, formData).subscribe({
        next: () => {
          this.router.navigate(['/table']); // Navigate to '/table' after update
          this.userForm.reset();
          this.dialogRef.close();
        },
       
        error: (err) => {
          console.error('Update user error:', err);
          // You can log err.error.errors here to see specific validation issues
          if (err.error && err.error.errors) {
            console.log('Validation errors:', err.error.errors);
          }
        }
      });
      this.loadUser();
      location.reload() // Reload user data

    }
  }
}