import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit{
  baseUrl: string='http://localhost:8080/'
  courses:any
  constructor(private http:HttpClient){}

  ngOnInit(): void {
this.getCourses()
  }
  getCourses(){
    return this.http.get(this.baseUrl+'getCourses').subscribe({
      next: (data) => {
        console.log(data);
        
        this.courses=data
     
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
