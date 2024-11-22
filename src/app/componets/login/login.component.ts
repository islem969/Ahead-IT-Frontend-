import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule, HttpClient, provideHttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,
  ReactiveFormsModule,
  FormsModule
     
  ],  // Ajouter RouterModule ici
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Corriger styleUrl en styleUrls
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public log!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  

  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  onLogin(){
    if (this.loginForm.valid){
        console.log(this.loginForm.value)
        this.auth.authenticate(this.loginForm.value)
        .subscribe({
            next: (res) => {
                alert(res.message);
                this.loginForm.reset();
                this.auth.storeToken(res.token);
                if( localStorage.getItem("role"))
                  { 
                if(localStorage.getItem("role") == "User"){ 
                  this.router.navigate(['dashboard']);
                  console.log("user")

                } else if(localStorage.getItem("role") == "Admin"){
                  this.router.navigate(['dashboard']);
                  console.log("admin")
                }



              }

            },
            error: (err) => {
                alert(err?.error.message)
            }
        })
    }
}


  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

/*checkValidEmail(event: string){

    const value = event;
    const pattern = 
  }*/
}
