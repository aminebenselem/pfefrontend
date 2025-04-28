import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courseId: string | null = null;
  course: any = null;
  loading: boolean=true

  constructor(private route: ActivatedRoute, private http: HttpClient ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.getById() ;
      this.loading = false;
     }}

getById(){
  this.http.get('http://localhost:8080/getCourse/'+this.courseId).subscribe({
   next:(res)=>{console.log(res);this.course=res
   },
   error:(err)=>{console.log(err);
   }
  })
}
extractFileName(filePath: string): string {
  return filePath.substring(filePath.lastIndexOf('/') + 1);
}
}