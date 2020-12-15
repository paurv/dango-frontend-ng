import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StoresService } from '../../services/stores.service';

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
               private router: Router,
               private storesService: StoresService ) {
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
          Swal.close();
          this.storesService.getUserStore( res.token )
              .subscribe( store => {
                console.log(store);

                if ( res.user.role === 'Empresa' ) {
                  this.router.navigate(['/admin-companies', store.storeUser._id]);
                } else if ( res.user.role === 'Admin' ) {
                  this.router.navigateByUrl('/admin');
                }

              }, error => {
                console.log(error);
              });
        }, err => {
          Swal.close();
          this.failedReq = true;
          this.mensajeEmail = err.error.message;
          console.log( err );
        });
  }

}
