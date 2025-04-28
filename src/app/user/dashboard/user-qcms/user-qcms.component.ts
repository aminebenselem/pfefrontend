import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-qcms',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-qcms.component.html',
  styleUrl: './user-qcms.component.css'
})
export class UserQcmsComponent implements OnInit{
  baseUrl: string='http://localhost:8080/'
  qcms:any
  constructor(private http:HttpClient){}
  ngOnInit(): void {
this.getQcms()
  }

  getQcms(){
this.http.get(this.baseUrl+'qcm').subscribe({
  next: (data) => {
    console.log(data);
    
    this.qcms=data
 
  },
  error: (e) => {
    console.log(e);
  }
});
  }
}
