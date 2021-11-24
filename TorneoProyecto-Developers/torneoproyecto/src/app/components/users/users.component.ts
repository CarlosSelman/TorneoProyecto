
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public usuarios;
  public idUsuarioModel: User;
  public idUser: User;
  constructor(public userService: UserService) {
    this.idUsuarioModel = new User("","","","","","","","","");
    this.idUser = new User("","","","","","","","","");
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.userService.showAllUser().subscribe(
      response => {
        this.usuarios = response
        console.log(response)
      }
    )
  }

  obtenerUsuarioId(idUsuario){
    this.userService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response;
        console.log(this.idUsuarioModel);
      }
    )
  }

  eliminarUsuario(idUsuario){
     this.userService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }


  editarUsuario(){
    this.userService.editarUsuario(this.idUsuarioModel).subscribe(
      response=>{
        console.log(response)
        this.obtenerUsuarios();
      }
    )
  }


  editarUsuarioAdmin(){
    this.userService.editarUsuarioAdmin(this.idUsuarioModel).subscribe(
      response=>{
        console.log(response)
        this.obtenerUsuarios();
      }
    )
  }
}

