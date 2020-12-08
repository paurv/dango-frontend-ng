import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  confirmPass: string;
  user: userModel;
  notMatch = false;
  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
    this.user = new userModel();
    // this.authService.verUrl();
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
    console.log('Formulario enviado: ', this.user);
    this.authService.signIn( this.user )
                    .subscribe( res => {
                      console.log('res', res);
                      localStorage.setItem('token', res.token);
                    }, err => {
                      console.log(err);
                    });
  }

}
