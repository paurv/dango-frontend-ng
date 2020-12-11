import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  confirmPass: string;
  user: userModel;
  notMatch = false;
  emailMessage = 'Ingrese un email valido.';
  emailErr = false;
  nextForm = false;
  years = [];

  constructor( private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.user = new userModel();
    this.setYears();
  }

  setYears(): void {
    const dt = new Date();
    const n = dt.getFullYear();
    console.log(n);
    for( let i = n; i < (n + 5); i++ ){
      this.years.push(i);
      console.log(this.years);
    }
  }

  signIn(): void{
    console.log('click');
  }

  onSubmit( form: NgForm ): void {
    this.notMatch = false;
    if ( form.invalid ) { return; }
    if ( !(this.confirmPass === this.user.password) ) {
      this.notMatch = true;
      return;
    }
    this.nextForm = true;
    // Swal.fire({
    //   allowOutsideClick: false,
    //   text: 'Espere un momento...'
    // });
    // Swal.showLoading();
    // this.authService.signIn( this.user )
    //                 .subscribe( res => {
    //                   console.log('res', res);
    //                   localStorage.setItem('token', res.token);
    //                   Swal.close();
    //                   if ( res.role === 'Empresa' ) {
    //                     this.router.navigateByUrl('admin-companies');
    //                   } else if ( res.role === 'Admin' ) {
    //                     this.router.navigateByUrl('admin');
    //                   }
    //                 }, err => {
    //                   Swal.close();
    //                   console.log(err);
    //                   this.emailErr = true;
    //                   this.emailMessage = err.error.message.errors.email.message || 'error';
    //                 });
  }

  creditCard( card ): void {
    let val = card.value;
    let newval = '';
    val = val.replace(/\s/g, '');
    for ( let i = 0; i < val.length; i++ ) {
        if ( i % 4 === 0 && i > 0) {
          newval = newval.concat(' ');
        }
        newval = newval.concat(val[i]);
        console.log(newval);
        card.value = newval;
      }
  }

}
