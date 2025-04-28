import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable({providedIn: 'root'})
export class DownloadService {
  token=localStorage.getItem("token");
  header=new HttpHeaders()
  .set("authorization","Bearer "+this.token)
  constructor(private http: HttpClient) {}
 
  download(url: string){
    
    return this.http.get(url, {
      responseType: 'blob' ,headers:this.header
    })
  }
}
export class DownloadserviceService {

  constructor() { }

}