import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Qcm } from './Qcm';
import { Question } from './Question';
import { Options } from './Option';

@Component({
  selector: 'app-add-qcm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-qcm.component.html',
  styleUrl: './add-qcm.component.css'
})
export class AddQcmComponent implements OnInit{
  qcms:any
  options:Options[]=[]
  option1:Options=new Options
  option2:Options=new Options
  option3:Options=new Options
  option4:Options=new Options
  question:Question=new Question()
qcm:Qcm=new Qcm()
  baseUrl: string='http://localhost:8080/'
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.getQcms()
  }
addQuestion(){
  this.options.push(this.option1,this.option2,this.option3,this.option4)
  this.question.options=this.options
  this.qcm.questions.push(this.question)
  console.log(this.qcm);
  
}
addQcm() {
  return this.http.post("http://localhost:8080/qcm",this.qcm,{responseType:'text'}).subscribe({
    next:(res)=>{alert("QCM saved successfully");
    },
    error:(err)=>{console.log(err);alert("error");
    }
  })
}
getQcms(){
  return this.http.get("http://localhost:8080/qcm").subscribe({
    next:(res)=>{console.log(res);this.qcms=res
    ;
    },
    error:(err)=>{console.log(err);
    }
  })
}
deleteById(event:any){
  this.http.delete(this.baseUrl+"qcm/"+event.target.id,{responseType:'text'}).subscribe({
    next:(res)=> {this.getQcms()},
    error:(err)=>{alert(err.message);console.log(err);}
  })
  }
}