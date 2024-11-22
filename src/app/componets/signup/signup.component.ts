import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/validationform';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule
  ],  // Import HttpClientModule here
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']  // Correct the styleUrls here
})
export class SignupComponent  implements OnInit{
  public singUpForm!: FormGroup;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) { }

  ngOnInit(): void { 
    this.singUpForm = this.fb.group({
     // username: ['',Validators.required],
      password: ['',Validators.required],
      username: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      registrationNumber: ['',Validators.required],
      sex: ['',Validators.required],
      cnss: ['',Validators.required],
      bban: ['',Validators.required],
      leavebalance: ['',Validators.required],
      numberofchildren: ['',Validators.required],
      householder: ['',Validators.required],
      salary: ['',Validators.required],
      updatedAt: ['',Validators.required],
      createdAt: ['',Validators.required],
      birthdate: ['',Validators.required],
      hiringdate: ['',Validators.required],
      leavebalancedate: ['',Validators.required],
      cin: ['',Validators.required],
        role: "string",
  token: "string"
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

onSingup(){
  if(this.singUpForm.valid){
    this.auth.signUp(this.singUpForm.value)
    .subscribe({
      next:(res=>{
        alert(res.message);
        this.singUpForm.reset();
        this.router.navigate(['login']);
      })
      ,error:(err=>{
        alert(err?.error.message)
      })
    })
    console.log(this.singUpForm.value)
  }else{

    ValidateForm.validateAllFormFields(this.singUpForm)
  
  }
  }
  }


  // Example method to make an HTTP GET request
 

