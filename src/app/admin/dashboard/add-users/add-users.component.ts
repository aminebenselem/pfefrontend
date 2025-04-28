import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css'
})
export class AddUsersComponent implements OnInit{
  user:User=new User()
  userlist:any
  baseUrl='http://localhost:8080/'
  token: any = localStorage.getItem('token');
  header = new HttpHeaders().set("authorization", "Bearer " + this.token);
  constructor(private http:HttpClient){}
  ngOnInit(): void {
this.getAll()
  }
adduser(){

this.http.post(this.baseUrl+"signup",this.user).subscribe({
  next:(res)=> {this.getAll();alert("user added successfully")},
  error:(err)=>{alert(err.error.details);
  }
})
}
getAll(){
  this.http.get(this.baseUrl+"all",{responseType:'json'}).subscribe({
    next:(res)=> {this.userlist=res},
    error:(err)=>{console.log(err);
    }
  })
}
deleteById(event:any){
this.http.delete(this.baseUrl+"user/"+event.target.id).subscribe({
  next:(res)=> {this.getAll()},
  error:(err)=>{alert(err.message);console.log(err);}
})
}

}