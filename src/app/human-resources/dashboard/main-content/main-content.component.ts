import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit {
  baseUrl:any='http://localhost:8080/'
  histories:any
  stats:any
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.getHistory()
    this.getStats()
  }


  getHistory(){
this.http.get(this.baseUrl+"history").subscribe({
  next:(res)=>{console.log(res);  this.histories=res },
  error:(err)=>{console.error(err);
  }
})
  }

  getStats(){
    this.http.get(this.baseUrl+"dashboard").subscribe({
      next:(res)=>{console.log(res);  this.stats=res },
      error:(err)=>{console.error(err);
      }
    })
  }
}
