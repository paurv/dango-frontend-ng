import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})

export class PaginasComponent implements OnInit {
  paginasEj: any[] = [{                          // objeto de prueba para la lista de info
    'nombre': 'Crime',
    'descripcion': 'lacus purus aliquet at',
    'principal': true
  }, {
    'nombre': 'Triller',
    'descripcion': 'porta volutpat quam'
  },  {
    'nombre': 'Terror',
    'descripcion': 'porta volutpat quam'
  },  {
    'nombre': 'Documentaries',
    'descripcion': 'porta volutpat quam'
  },  {
    'nombre': 'Action',
    'descripcion': 'porta volutpat quam'
  }, {
    'nombre': 'Sci-Fi',
    'descripcion': 'donec vitae nisi nam'
  }, {
    'nombre': 'Comedy',
    'descripcion': 'rutrum rutrum neque aenean auctor'
  }, {
    'nombre': 'Romance',
    'descripcion': 'praesent blandit nam nulla integer'
  }];
  pagsArr: any[] = [];                           // arreglo temporal para mostrar datos de busqueda
  pagsModal: boolean;

  constructor( public ubicPagina: Router) {
    // console.log(ubicPagina.url);
    // /admin-companies/paginas/sitio-config
  }

  ngOnInit(): void {
  }

  buscarPagina(termino: string) {
    // console.log(termino);
    this.pagsArr = [];
    termino = termino.toLowerCase();
    for (let paginas of this.paginasEj) {
      let nombre = paginas.nombre.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        this.pagsArr.push(paginas);
      }
    }
    return this.pagsArr;
  }

}
