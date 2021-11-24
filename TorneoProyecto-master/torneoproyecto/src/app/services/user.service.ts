import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:String;
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

   login(usuario): Observable<any>{
     let params = JSON.stringify(usuario)

    return this.http.post(this.url + '/Login', params, {headers: this.headers})
   }

   getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem("identidad"))
    if(identidad2 != undefined){
       this.identidad = identidad2;
    }else{
       this.identidad = null;
    }
    return this.identidad;
 }

 registro(usuario: User): Observable<any>{
  let params = JSON.stringify(usuario);

  return this.http.post(this.url + '/createUser', params, {headers: this.headers})
 }


 obtenerUsuarioId(id:String): Observable<any>{
  return this.http.get(this.url + '/findUserId/' + id, {headers: this.headers})
 }

 editarUsuario(usuario: User): Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())
  let params = JSON.stringify(usuario);
  return this.http.put(this.url + '/editUser', params, {headers: token} )
 }

 editarUsuarioAdmin(usuario: User): Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())
  let params = JSON.stringify(usuario);
  return this.http.put(this.url + '/editUserAdmin/'+usuario._id,params, {headers: token} )
 }

 eliminarUsuario(id:String): Observable<any>{{
  let token = this.headers.set('Authorization', this.getToken())
  return this.http.delete(this.url + '/dropUser/' + id, {headers: token})
 }}

 usuarioManager(): Observable<any>{
   return this.http.get(this.url + '/userManager', {headers:this.headers})
 }

 showAllUser(): Observable<any>{
  let token = this.headers.set('Authorization', this.getToken())
   return this.http.get(this.url + '/showAllUser', {headers:token})
 }


 getToken(){
  var token2 = localStorage.token;
  if(token2 != undefined){
    this.token = token2;
  }else{
    this.token = null
  }
  return this.token
}


}
