import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup =this.fb.group({
    name: ['test 2', [Validators.required, Validators.minLength(3)]],
    email: ['test2@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor( private fb: FormBuilder, private router: Router, private authS: AuthService) { }

  register(){
    const {email, password, name} = this.registerForm.value;

    this.authS.register(name, email, password)
      .subscribe(ok =>{
        if (ok===true){
          this.router.navigateByUrl('/dashboard')
        }else{
          Swal.fire('Error', ok, 'error')
        }
        
    });
    
  }
}
