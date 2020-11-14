import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarModal(valor?: string){
    $('#modal-tema').modal('show');
  }
}
