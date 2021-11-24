import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  public url: String;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  constructor ( public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getTeams(token, id: String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/getTeams/' + id,
    { headers: headersToken,
    })
  }

  getTeamName(token, id: String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/getTeamName/' + id,
    { headers: headersToken,
    })
  }

  getTeamId(token, id: String): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/getTeamId/' + id,
    { headers: headersToken,
    })
  }

  createTeam(token, team, idTournament): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(team);

    return this._http.post(this.url + '/createTeam/' + idTournament , params, {headers: headersToken})
  }

  editTeam(token, team: Team): Observable<any> {
    let params = JSON.stringify(team)
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editTeam/' + team._id, params, {headers: headersToken})
  }

  deleteTeam(token, id: String): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/deleteTeam/' + id, { headers: headersToken})
  }


}
