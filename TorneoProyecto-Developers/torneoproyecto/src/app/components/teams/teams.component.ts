import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [ TeamService, UserService]
})
export class TeamsComponent implements OnInit {
  public token;
  public teamModel: Team;
  public teamModelB: Team;
  public teamModelEd: Team;
  public teamModelE: Team;
  public idTeamRuta: string;


  constructor(
    private _teamService: TeamService,
    private _userService: UserService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.teamModel = new Team("","","","",0,0,0,0,0,0,0,0)
    this.teamModelB = new Team("","","","",0,0,0,0,0,0,0,0)
    this.teamModelEd = new Team("","","","",0,0,0,0,0,0,0,0)
    this.teamModelE = new Team("","","","",0,0,0,0,0,0,0,0)
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idTeamRuta = dataRuta.get('idTournament');
    });
    this.getTeams(this.idTeamRuta);

  }

  getTeams(idTournament){
    this._teamService.getTeams(this.token, idTournament).subscribe(
      (response) => {
        this.teamModelE = response.teamsFound;
        console.log(response);
      }
    )
  }

  getTeamId(idTeam){
    this._teamService.getTeamId(this.token, idTeam).subscribe(
      (response) => {
        this.teamModelB = response.teamFound;
        console.log(response);
      }
    )
  }

  createTeam(){

    this._teamService.createTeam(this.token, this.teamModel, this.idTeamRuta).subscribe(
      (response) => {
        console.log(response);
        this.teamModelEd = response.teamSaved;
        this.teamModel.name = '';
        this.teamModel.picture = '';
        this.teamModel.tournament = '';
        this.getTeams(this.idTeamRuta);

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  editTeam(){
    this._teamService.editTeam(this.token, this.teamModelB).subscribe(
      response=>{
        console.log(response);
        this.getTeams(this.idTeamRuta);
      }
    )
  }

  deleteTeam(idTeam){
    this._teamService.deleteTeam(this.token, idTeam).subscribe(
      response=>{
        console.log(response);
        this.getTeams(this.idTeamRuta);
      }
    )
  }

}
