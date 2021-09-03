import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders(
      {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization': `Basic c3BvdEFwcDo4NTQ3OGFhMS04ZmFlLTQ2Y2QtOGRhMC1kYWNkN2VjOWY1NjE=`
      }
    )
  }
  
  constructor(private http: HttpClient) { }

  login(form: any){
    let body= `grant_type=password&username=${form.username}&password=${form.password}`; 
    return this.http.post("/api/authorizationServer/oauth/token", body, this.httpOptions);
  }
}
