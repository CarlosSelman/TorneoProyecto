import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { Team } from 'src/app/models/team.model';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [MatchService,TeamService]
})
export class MatchComponent implements OnInit {
  public token;
  public matchGet : Match;
  public matchJornada : Match
  public idTournamentRuta: String;
  public teams ;
  public jornada;
  public team
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private matchService: MatchService,
    public activatedRoute: ActivatedRoute

  ) {
    this.token = this.userService.getToken();
    this.matchGet = new Match("","","","",0,0,0)
    this.matchJornada = new Match("","","","",0,0,0)
    this.teams = new Team("","","","",0,0,0,0,0,0,0,0)

   }
   chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartData = [];
  chartColors = [{
    backgroundColor: [],
    borderColor: []
  }];
  chartLegend = true;
  chartPlugins = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idTournamentRuta = dataRuta.get('idTournament');

    });

    this.getMatch(this.idTournamentRuta);
    this.getTeams();



  }

  getMatch(idTournament){
    this.matchService.getMatches(idTournament).subscribe(
      response => {
        this.matchGet = response
      }
    )
  }

  createMatch(){
    this.matchService.createMatch(this.idTournamentRuta).subscribe(
      response => {
        console.log(response)
        this.getMatch( this.idTournamentRuta)
        this.refresh()
      }
    )
  }

  simulation(idMatch){
    this.matchService.simulation(idMatch).subscribe(
      response =>{
        this.getMatch(this.idTournamentRuta)
        this.getTeams()
      }
    )
  }

  getTeams(){
    this.teamService.getTeams(this.token, this.idTournamentRuta).subscribe(
      response =>{
        this.teams = response.teamsFound
        this.jornada = response.jornadas
        this.team = this.teams.name

      }
    )
  }

  getTeamname(){
    console.log(this.teams)
    this.teams.forEach(element=>{
      this.chartData.push(element.points)
      this.chartLabels.push (element.name)
      this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
    })

  }

  jornadAc(idMatch){
    this.matchService.jornada(idMatch,this.jornada).subscribe(
      response=>{
        console.log(response)
        this.getMatch(this.idTournamentRuta);
        this.getTeams()
      }
    )
  }

  generatePDF(){
    this.matchService.generatePDF(this.idTournamentRuta).subscribe(
      response => {

      }
    )
  }

  refresh(): void{
    window.location.reload();
  }

}
