import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  public userModel: User;
  public token;
  public identidad;
  public usuarios;

  constructor(public userService:UserService,
    private router:Router) {
      this.identidad = this.userService.getIdentidad();
      this.userModel = new User("","","","","","","","","");

   }


  ngOnInit(): void {
  }

  login(){

    this.userService.login(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.refresh()
        this.identidad = response.userFound
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken();
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.router.navigate(['/inicio']);
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  getToken(){
    this.userService.login(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Email o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  navegarCuenta(idUsuario){
    this.router.navigate(['/cuenta', idUsuario])
  }

  refresh(): void{
    window.location.reload();
  }

  eliminarUsuario(idUsuario){
    this.userService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        localStorage.setItem('identidad', JSON.stringify(""))
        this.refresh()
        this.router.navigate(['/inicio']);
      }
    )
  }
/*
  cerrarSesion(){
    response=>{
      console.log(response)
      this.refresh()
      localStorage.setItem('identidad', JSON.stringify(""))
      this.router.navigate(['/inicio']);
    }
  }
*/
  obtenerUsuarioId(idUsuario){
    this.userService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.userModel = response;
        console.log(response);
      }
    )
  }

  editarUsuario(){
    this.userService.editarUsuario(this.userModel).subscribe(
      response=>{
        console.log(response)
        this.identidad = response
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
      }
    )
  }
}
