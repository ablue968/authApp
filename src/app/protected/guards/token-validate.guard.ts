import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidateGuard implements CanActivate, CanLoad {

constructor(private authS: AuthService, private router: Router ){}

  canActivate(): Observable<boolean> | boolean {
    return this.authS.tokenValidation()
      .pipe(
        tap( valid=>{
          if(!valid){
            this.router.navigateByUrl('/auth/login')
          }
        })
      )
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authS.tokenValidation()
      .pipe(
        tap( valid=>{
          if(!valid){
            this.router.navigateByUrl('/auth/login')
          }
        })
    )
  }
}