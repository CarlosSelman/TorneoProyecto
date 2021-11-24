
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from "../../services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;

  constructor(
    private _userService: UserService,
    private _router: Router) {
    this.user = new User("","","","","","","","","");
   }

  ngOnInit(): void {
  }

  registrar(){
    if(this.user.name===""||this.user.user===""||this.user.name===""||this.user.lastName===""||this.user.password===""||this.user.email===""||this.user.age===""||this.user.picture===""){
      Swal.fire({
        /*position: 'top',*/
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
    console.log(this.user)

    this._userService.registro(this.user).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Cuenta registrada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate(['/login'])
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          /*position: 'top',*/
          icon: 'error',
          title: 'No se pudo registrar la cuenta',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }
}
}
