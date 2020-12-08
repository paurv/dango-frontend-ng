import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: userModel;
  mensajeEmail = 'Campo requerido';
  failedReq = false;

  constructor( private authService: AuthService ) {
    this.user = new userModel();
  }

  ngOnInit(): void {
  }

  onLogin( form: NgForm): void{
    if ( form.controls.email.status === 'INVALID' ){
      this.mensajeEmail = 'Ingrese un email valido';
    }
    if ( form.invalid ) {
      console.log(form);
      return;
    }
    console.log('user: ', this.user);

    this.authService.login( this.user )
        .subscribe( res => {
          console.log( res );
        }, err => {
          this.failedReq = true;
          this.mensajeEmail = 'Usuario o contraseña invalido';
          console.log( err );
        });
  }

}
