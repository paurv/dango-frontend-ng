import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: userModel;
  mensajeEmail = 'Campo requerido';
  failedReq = false;

  constructor( private authService: AuthService,
               private router: Router ) {
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
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere un momento...'
    });
    Swal.showLoading();
    console.log('user: ', this.user);

    this.authService.login( this.user )
        .subscribe( res => {
          console.log( res );
          console.log( 'User role: ', res.user.role );
          Swal.close();
          if ( res.user.role === 'Empresa' ) {
            this.router.navigateByUrl('/admin-companies');
          } else if ( res.user.role === 'Admin' ) {
            this.router.navigateByUrl('/admin');
          }
        }, err => {
          Swal.close();
          this.failedReq = true;
          this.mensajeEmail = err.error.message;
          console.log( err );
        });
  }

}
