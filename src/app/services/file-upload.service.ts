import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  token=localStorage.getItem('token');
  baseURL:String="http://localhost:8080"
  header=new HttpHeaders()
     .set("authorization","Bearer "+this.token);
  constructor(private httpClient: HttpClient) { }

  upload(file: File[],filename:string,url:string){

    const formData: FormData = new FormData();
    file.forEach(fil => {
      formData.append('file', fil);  
    });
      return this.httpClient.post(this.baseURL+url, formData,{headers:this.header});
  }
 
}