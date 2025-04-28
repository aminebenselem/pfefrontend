import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './User';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None, 
})
export class LoginComponent implements OnInit{
 user:User=new User()
response:any

constructor(private router:Router,private loginservice:LoginService ){}

  ngOnInit(): void {
    if(localStorage.getItem('role')=='user'){this.router.navigate(['user'])}
    else if(localStorage.getItem('role')=='admin'){this.router.navigate(['admin'])}
    else if(localStorage.getItem('role')=='hr'){this.router.navigate(['hr'])}
    else{this.router.navigate(['login'])}
  }

 signIn(){
  let data=JSON.parse(JSON.stringify(this.user));
this.loginservice.login(data).subscribe({
  next:(res) => {console.log(res);
  
  this.response=res;
localStorage.setItem('token',this.response.token);localStorage.setItem('username',res.username);localStorage.setItem('role',res.role)
  },
error: (err) => {alert(err.error?.details);console.log(err);
},
complete: () => {
  if(localStorage.getItem('role')=='user'){this.router.navigate(['user'])}
  else if(localStorage.getItem('role')=='admin'){this.router.navigate(['admin'])}
  else{this.router.navigate(['hr'])}
}
});
 } 

 
}
