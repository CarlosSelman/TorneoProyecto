import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  public url:String;
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }


  getMatches(id): Observable<any>{
    let autorizacion = this.headers.set('Authorization',this.getToken());

    return this.http.get(this.url + '/showMatch/'+id, {headers: autorizacion})
  }

  createMatch(idTournment): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/createMatch/' + idTournment, {headers: token} )
  }

  simulation(idMatch): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    return this.http.get(this.url + '/simulationMatch/'+idMatch, {headers:token})
  }

  jornada(idMatch, jornada): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    return this.http.get(this.url + '/jornada/' + idMatch+'/'+jornada, {headers:token})
  }

  generatePDF(idTournament): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/pdfGenerate/'+idTournament, {headers:token})
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
