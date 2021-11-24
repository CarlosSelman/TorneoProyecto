import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  public url: String;
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

   getTournaments(token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)

    return this.http.get(this.url + '/getTournaments', { headers: headersToken });
  }

  getTournamentId(token, id): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)

    return this.http.get(this.url + '/getTournamentId/' + id, { headers: headersToken });
  }

   createTournament(tournament: Tournament, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(tournament);

    return this.http.post(this.url + '/createTournament', params, {headers: headersToken})
  }

  editTournament(tournament: Tournament, id): Observable<any>{
    let params = JSON.stringify(tournament);
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.put(this.url + '/editTournament/' + id, params, { headers: headersToken})
  }

  deleteTournament(id){
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.delete(this.url + '/deleteTournament/' + id, { headers: headersToken})
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
