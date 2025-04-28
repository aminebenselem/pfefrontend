import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent  implements OnInit{
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
      complete:()=>{this.dashboard()}
    })
}

dashboard(){
  // 1. Calculate average score
const totalScore = this.histories.reduce((sum: any, history: { score: any; }) => sum + history.score, 0);
const averageScore = this.histories.length > 0 
  ? parseFloat((totalScore / this.histories.length).toFixed(1)) 
  : 0;
// 2. Count completed QCMs
const completedCount = this.histories.length;

// 3. Sort by attemptDate descending and get last 3
const lastThreeQcms = this.histories
  .sort((a: { attemptDate: string | number | Date; }, b: { attemptDate: string | number | Date; }) => new Date(b.attemptDate).getTime() - new Date(a.attemptDate).getTime())
  .slice(0, 3);

// 4. Build the final object
 this.result = {
  averageScore: averageScore,
  completedQcms: completedCount,
  lastThreeQcms: lastThreeQcms
};
}

}
