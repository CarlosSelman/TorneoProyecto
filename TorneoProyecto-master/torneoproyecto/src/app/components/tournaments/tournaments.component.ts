import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  public token;
  public identidad
  public tournamentModelGet: Tournament;
  public tournamentModelGetId: Tournament;
  public tournamentModelCreate: Tournament;

  constructor(
    private _tournamentService: TournamentService,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
    this.tournamentModelCreate = new Tournament('', '', '', '')
    this.tournamentModelGetId = new Tournament('', '', '', '')
    this.identidad = this._userService.getIdentidad();
  }

  ngOnInit(): void {
    this.getTournaments();
    console.log(this.identidad.type)
  }

  getTournaments() {
    this._tournamentService.getTournaments(this.token).subscribe(
      response => {
        this.tournamentModelGet = response.tournamentsFound;
        console.log(this.tournamentModelGet);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getTournamentId(id) {
    this._tournamentService.getTournamentId(this.token, id).subscribe(
      response => {
        this.tournamentModelGetId = response.tournamentFound;
        console.log(this.tournamentModelGetId);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  createTournament() {
    this._tournamentService.createTournament(this.tournamentModelCreate, this.token).subscribe(
      response=>{
        this.tournamentModelCreate.name = '';
        this.tournamentModelCreate.picture = '';
        console.log(response);
        this.getTournaments();
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Información insuficiente o el torneo ya existe',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  editTournament() {
    this._tournamentService.editTournament(this.tournamentModelGetId, this.tournamentModelGetId._id).subscribe(
      response=>{
        this.tournamentModelGetId = response.tournamentEdited;
        console.log(this.tournamentModelGetId);
        this.getTournaments();
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Intenta con otro nombre de torneo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  deleteTournament() {
    this._tournamentService.deleteTournament(this.tournamentModelGetId._id).subscribe(
      response=>{
        console.log(response);
        this.getTournaments();
      }
    )
  }


}
