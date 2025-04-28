import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent implements OnInit{

  constructor(private http:HttpClient){}
  baseUrl:any='http://localhost:8080/'
  histories:any
  result:any
  token:any=localStorage.getItem('token')
  header=new HttpHeaders()
  .set("authorization","Bearer "+this.token);
  ngOnInit(): void {
this.getHistory()  }

  getHistory(){
    this.http.get(this.baseUrl+"myhistory",{headers:this.header}).subscribe({
      next:(res)=>{console.log(res);  this.histories=res },
      error:(err)=>{console.error(err);
      },
      complete:()=>{}
    })
}


}