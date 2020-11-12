import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  soloLectura: boolean = true;
  soloLecturaHeader: boolean = true;
  soloLecturaFooter: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  inputsVal(estado: boolean){
    if(estado) {
      // this.modificar = false;
    }else{
      // this.modificar = true;
    }
  }
}
