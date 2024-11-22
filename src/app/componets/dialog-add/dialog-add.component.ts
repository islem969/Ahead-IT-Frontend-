
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { merge } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/User';

{}


@Component({
  selector: 'app-dialog-add',
  providers: [
    provideNativeDateAdapter(),
    { 
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  standalone: true,
  imports:[
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add.component.html',
  styleUrl: './dialog-add.component.css'
})
export class DialogAddComponent {
  ////////////////Number/////////////
  
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  /////////////////step///////////
  firstFormGroup = this._formBuilder.group({
    lastName: ['', Validators.required],
    FirstName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    birthdate: ['', Validators.required],
    salary: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    qualificationId: ['', Validators.required],
    sex : ['', Validators.required] 
  });
  secondFormGroup = this._formBuilder.group({
    bban: ['', Validators.required],
    cnss: ['', Validators.required],
    leaveBalance: ['', Validators.required],
    numberofchildren: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    hiringdate: ['', Validators.required],
    leavebalancedate: ['', Validators.required]
  });
  ////////////Mail//////////////
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');
 ////////////////////////////////////////////////////
 
  constructor(private _formBuilder: FormBuilder , private api: ApiService,private dialogRef: MatDialogRef<DialogAddComponent>) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  ////////////////////Password//////////////
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit(){
    householder: [false];
    
  }
  addUser() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const user: any =  {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        id: 0, // Default or fetched value
        email: this.email.value!,
        cin: '', // Ensure to provide a value or make sure it's part of the form
        role: '', // Ensure to provide a value or make sure it's part of the form
        username :  this.firstFormGroup.value.username?? "",
        firstName: this.firstFormGroup.value.FirstName ?? '',
        lastName: this.firstFormGroup.value.lastName ?? "",
        password : this.firstFormGroup.value.password ?? "",
        birthdate: this.firstFormGroup.value.birthdate ? new Date(this.firstFormGroup.value.birthdate) : new Date(), // Default to current date if birthdate is not provided
        sex: this.firstFormGroup.value.sex ?? "",
        salary: this.firstFormGroup.value?.salary ? parseFloat(this.firstFormGroup.value.salary) : 0, // Using ?. operator
        phoneNumber: this.firstFormGroup.value?.phoneNumber ?? '', // Using ?. operator
        bban: this.secondFormGroup.value?.bban ?? '', // Using ?. operator
        cnss: this.secondFormGroup.value?.cnss ?? '', // Using ?. operator
        token: '', // Using ?. operator
        qualificationId: this.firstFormGroup.value?.qualificationId ?? '', // Using ?. operator

      leavebalance: this.secondFormGroup.value?.leaveBalance ? parseFloat(this.secondFormGroup.value.leaveBalance) : 0, // Using ?. operator
      numberofchildren: this.secondFormGroup.value?.numberofchildren ? parseFloat(this.secondFormGroup.value.numberofchildren) : 0, // Using ?. operator
      registrationNumber: this.secondFormGroup.value?.registrationNumber ?? '', // Using ?. operator
        hiringdate: this.secondFormGroup.value.hiringdate ? new Date(this.secondFormGroup.value.hiringdate) : new Date(), // Default to current date if hiringdate is not provided
        leavebalancedate: this.secondFormGroup.value.leavebalancedate ? new Date(this.secondFormGroup.value.leavebalancedate) : new Date(), // Default to current date if leavebalancedate is not provided
      };
      console.log(user);
      this.api.addUsers(user).subscribe({
        next: (res) => {
          console.log('User added successfully:', res);
          alert("User added successfully");
          this.firstFormGroup.reset();
          this.secondFormGroup.reset();
          this.dialogRef.close();
          // Optionally reset forms or handle success actions
        },
        error: (err) => {
          console.error('Error adding user:', err);
          // Handle error messages or user feedback
        }
      });
  
      console.log('User:', user); // This logs the user object locally
      // Implement any local logic with the user object here
    } else {
      console.log('Form is not valid');
      // Handle form validation errors if necessary
    }
  }
}  

