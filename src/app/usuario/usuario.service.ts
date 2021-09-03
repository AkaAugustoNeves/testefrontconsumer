import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 'User-Key': `0045d414426c21a13672f4251deb1f02df1ec670` }),
    params: new HttpParams({}),
    body: ({})
  }


  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get<Usuario[]>("/api/spotAPIRestUsuario/controller/getusuarios", this.httpOptions);
  }

  findByEmail(form: any){
    // var httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 'User-Key': `0045d414426c21a13672f4251deb1f02df1ec670` }),
    //   params: new HttpParams({}),
    //   observe: "`email`: `${form.email}`"
    // }
    //console.log(httpOptions);
    //var request = new HttpRequest("GET", "/api/spotAPIRestUsuario/controller/getusuariobyemail", { reportProgress: true, responseType: 'json' });
    var options = {
      body : "{"+JSON.stringify("email") + ":" + JSON.stringify(form.email)+"}",
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 'User-Key': `0045d414426c21a13672f4251deb1f02df1ec670` }),
      
    }
    console.log("{"+JSON.stringify("email") + ":" + JSON.stringify(form.email)+"}");
    return this.http.request("GET", "/api/spotAPIRestUsuario/controller/getusuariobyemail", options);
    //return this.http.get<Usuario[]>("/api/spotAPIRestUsuario/controller/getusuariobyemail", this.httpOptions)
  }

  desabilitarUsuario(usuario: Usuario){
    return this.http.put<Usuario>("/api/spotAPIRestUsuario/controller/updateusuario", usuario, this.httpOptions);
  }

  editarUsuario(usuario: Usuario){
    return this.http.put<Usuario>("/api/spotAPIRestUsuario/controller/updateusuario", usuario, this.httpOptions);
  }

  criarUsuario(usuario: Usuario){
    return this.http.post<Usuario>("/api/spotAPIRestUsuario/controller/insertusuario", usuario, this.httpOptions);
    
  }
}
