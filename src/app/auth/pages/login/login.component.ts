import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email:    ['test1@test.com',[ Validators.required, Validators.email]],
    password: ['123456',[ Validators.required, Validators.minLength(6)]],
  })

  constructor( private fb: FormBuilder, private router:Router, private authS: AuthService) { }

  login(){
    const {email, password} = this.loginForm.value;

    this.authS.login(email, password)
      .subscribe(ok =>{
        if (ok===true){
          this.router.navigateByUrl('/dashboard')
        }else{
          Swal.fire('Error', ok, 'error')
        }
        
    });
    
  }

}
