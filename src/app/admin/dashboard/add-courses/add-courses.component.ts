import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from './Course';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent implements OnInit {
  file: File[]=[];
   fileUris:any= [];
   filename:string=""
courses:any
  categories:any
  course:Course=new Course
  baseUrl='http://localhost:8080/'
  constructor(private http:HttpClient,private fileUploadService:FileUploadService){}
  ngOnInit(): void {
this.getCategories()
this.getCourses()
  }

getCategories(){
  return this.http.get(this.baseUrl+"categories").subscribe({
    next:(res)=> {console.log(res);this.categories=res
    },
    error:(err)=>{console.log(err);
    }
  })
}
selectFile(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.file = Array.from(event.target.files);  // correct: array of File
    console.log(this.file);
  }
}
uploadFile() {
  this.fileUploadService.upload(this.file, this.filename, "/upload").subscribe({
    next: (data) => {
      console.log(data);
      this.course.files=data},
    error: (e) => {
      console.log(e);
    },
    complete:()=>{this.addCourses()}
  });
}
addCourses(){

console.log(this.course);

  return this.http.post(this.baseUrl+"addcourse",this.course).subscribe({
    next: (data) => {
      alert("Course added Successfully");
      console.log(data);
      
    },
    error: (e) => {
      console.log(e);
    },
complete:()=>{this.getCourses()}
  });
}
  

  getWord(minLength: number = 4, maxLength: number = 10):any {
    return Math.trunc(Math.random() * (100000));
  
  }
  getFilename(file: File){
    let filename=file.name
    let extension =filename.substring(filename.lastIndexOf('.'), filename.length) || filename;
   return filename.substring(0,filename.lastIndexOf('.')-1)+this.getWord()+'.'+extension;
  
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
  deleteById(event:any){
    this.http.delete(this.baseUrl+"courses/"+event.target.id,{responseType:'text'}).subscribe({
      next:(res)=> {this.getCourses()},
      error:(err)=>{alert(err.message);console.log(err);}
    })
    }
}
