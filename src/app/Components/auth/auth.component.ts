import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';
import { emailValidator } from '../user-forms/validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {



  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router,private snack:MatSnackBar){

  }
  

  authForm = this.fb.group({
    email: ['', [emailValidator]],
    password: ['', [Validators.minLength(6)]]
  })

  handleLogin():void{
    const email = this.authForm.get('email')?.value 
    const password = this.authForm.get('password')?.value 
    if(!email || !password){
      return;
    }
    if(this.authService.login(email, password)){
      const destination = this.authService.getUser()?.role === 'CSR' ? '/user-list' : '/user-form';
      this.router.navigate([destination])
    }else{
      this.snack.open("Invalid Credentials","OK",{
        duration: 3000,
        horizontalPosition:'right',
        verticalPosition:'top',
        panelClass:['error']
      })
    }
  }

}
