import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  soloLectura: boolean = true;
  soloLecturaHeader: boolean = true;
  soloLecturaFooter: boolean = true;
  siteConfig: any = {};
  siteConfigKeywords =  '';
  constructor( private storesService: StoresService ) {

  }

  ngOnInit(): void {
    this.storesService.getUserStore( localStorage.getItem('token') )
        .subscribe( res => {
          console.log( res );
          this.siteConfig = res.storeUser;
          console.log(this.siteConfig.name);
          this.siteConfigKeywords = res.storeUser.site.keyWords.join(', ');
          console.log(this.siteConfigKeywords);
        }, err => {
          console.log( err );
        });
  }
}
