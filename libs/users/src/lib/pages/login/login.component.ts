import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmitted: boolean=false;
  authError: boolean = false;
  AuthMessage='Email or Password is Wrong';

  constructor(private formBuilder:FormBuilder, private auth: AuthService, private localStorageService: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
    this._initloginForm();
  }

  private _initloginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.loginFormGroup.invalid){
      return;
    }
    this.auth.login(this.loginFormGroup.value.email, this.loginFormGroup.value.password).subscribe((user)=>{
      this.authError = false;
      this.localStorageService.setToken(user.token);
      this.router.navigate(['/']);
    },
    (err: HttpErrorResponse)=>{
      this.authError = true;
      console.log(err);
      if(err.status !=401){
        this.AuthMessage = 'Something went wrong';
      }
    })

  }

}
