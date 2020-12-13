import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StoresService } from '../../../services/stores.service';

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
  storeItem: any;
  pages: any[] = [];
  idStore: string;

  newPageData: any = {};

  constructor( public ubicPagina: Router,
               private storeService: StoresService ) { }

  ngOnInit(): void {
    this.storeService.getUserStore( localStorage.getItem('token') )
        .subscribe( resp => {
          console.log(resp);
          this.idStore = resp.storeUser._id;
          this.pages = resp.storeUser.pages;
        }, err => {
          console.log(err);
        });
   }

   newPage( form: NgForm ): void{
    if ( form.invalid ) {
      return;
    }
    console.log(form);
    const data = {
      pageUrl: this.newPageData.pageUrl,
      pageName: this.newPageData.pageName,
      mainPage: false,
      description: this.newPageData.description
    };
    console.log(data);
    this.storeService.createPage( this.idStore, localStorage.getItem('token'), data)
        .subscribe( resp => {
          console.log( resp );
          this.newPageData = {};
          this.pages = resp.newPage.pages;
        }, err => {
          console.log( err );
        });
   }

   deletePage( idpage ): void {
     console.log(`Pagina: ${idpage}, tienda: ${this.idStore}`);
     this.storeService.deletePage( this.idStore, localStorage.getItem('token'), idpage)
         .subscribe( resp => {
           console.log(resp);
           this.pages = resp.newPageArray;
         }, err => {
           console.log(err);
         });
   }

  buscarPagina(termino: string) {                // tslint:disable-line
    this.pagsArr = [];
    termino = termino.toLowerCase();
    for (const paginas of this.pages) {
      const nombre = paginas.nombre.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        this.pagsArr.push(paginas);
      }
    }
    return this.pagsArr;
  }

  sendPageId( pageId, name ){
    this.storeService.page = pageId;
    this.storeService.pageName = name;
    console.log( this.storeService.pageName );
  }
}
