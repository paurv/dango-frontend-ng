import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { userModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { creditCardModel } from '../../models/creditCard';
import { PlansService } from '../../services/plans.service';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: userModel;
  creditCardIn: creditCardModel;
  confirmPass: string;
  storeName: string;
  storeUrl: string;
  // selectedPlan: string;
  // cost: string;

  years = [];
  roles = [ 'Cliente', 'Empresa' ];
  plans = [];
  planSpecs: any = {};
  emailMessage = 'Ingrese un email valido.';      // error handlers
  notMatch = false;
  emailErr: boolean;
  nextForm = false;

  constructor( private authService: AuthService,
               private router: Router,
               private plansService: PlansService,
               private storesService: StoresService ) { }

  ngOnInit(): void {
    this.user = new userModel();
    this.creditCardIn = new creditCardModel();
    this.setYears();

    this.plansService.getPlans()
        .subscribe( res => {
          this.plans = res.plans;
        }, err => {
          console.log(err);
        });
    // this.authService.verUrl();
  }

  setPlanSpecs(planId): void {
    this.plansService.getPlan(planId)
        .subscribe(
          plan => {
            this.planSpecs = plan.resp;
          }, err => {
            console.log(err);
          })
  }

  setYears(): void {
    const dt = new Date();
    const n = dt.getFullYear();
    for( let i = n; i < (n + 5); i++ ){
    this.years.push(i);
    }
  }

  signIn(): void{
    console.log('usuario', this.user);
  }

  onSubmitUser( form: NgForm ): void {
    this.notMatch = false;
    if ( form.invalid ) { return; }
    if ( !(this.confirmPass === this.user.password) ) {
      this.notMatch = true;
      return;
    }

    this.authService.checkEmail( {email: this.user.email} )
        .subscribe( res => {
          console.log( res );
          if ( !res.ok ) {
            this.emailErr = true;
            this.emailMessage = res.message || 'error';
            console.log('click servicio');
            return;
          } else {
            this.emailErr = false;
            if ( form.valid ) {
              this.nextForm = true;
            }
            console.log('click servicio');
          }
        }, err => {
          console.log(err);
          this.emailErr = true;
          this.emailMessage = 'Error algo salio mal';
        });
  }

  onSubmitCompany( form: NgForm ): void {
    console.log(this.user);
    console.log( form.controls.plan.pristine );
    if ( form.invalid
        || form.controls.plan.pristine
        || form.controls.expDate.pristine
        || form.controls.expYear.pristine ) {

      Swal.fire({
        allowOutsideClick: true,
        icon: 'warning',
        text: 'favor llene todos los campos'
      });
      return;
    }
    // const role = '';
    const data = {
      name: this.storeUrl,
      storeUrl: this.storeName
    }
    console.log('tienda: ', data);

    this.authService.signIn( this.user )
                    .subscribe( res => {
                      console.log('res', res);
                      // console.log('token: ', JSON.stringify(localStorage.getItem('token')));
                      this.storesService.createStore( data, res.token )
                          .subscribe( store => {
                            console.log(store);

                            // if ( res.role === 'Empresa' ) {
                            //   this.router.navigateByUrl('admin-companies');
                            // } else if ( res.role === 'Admin' ) {
                            //   this.router.navigateByUrl('admin');
                            // }
                          }, errStore => {
                            console.log(errStore);
                          });
                    }, err => {
                      console.log(err);
                      return;
                    });
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
        card.value = newval;
      }
  }

}
