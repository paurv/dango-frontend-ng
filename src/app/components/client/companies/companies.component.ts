import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  urlId: any;
  pageId: any;
  currentStore: any;
  currentPage: any;
  allStores: any;
  toggleButton = false;

  storeStyle: any;
  storeHtml: any;
  storeJs: any;

  constructor( private storesService: StoresService,
               private router: ActivatedRoute,
               private routerNav: Router,
               private __sanitazer: DomSanitizer ) { }

  ngOnInit(): void {
    this.storesService.getAllStores()
        .subscribe(
          res => {
          console.log(res);
          this.router.paramMap.subscribe(
            param => {
              this.urlId = param.get('idCompany');
              this.pageId = param.get('pageId');
              if ( this.urlId && this.pageId ) {
                console.log('entro a una tienda con pagina');
                this.getStore( res.allStores, this.urlId );
              } else if ( this.urlId ) {
                console.log('entro a una tienda sin pagina');
                this.getStore( res.allStores, this.urlId );
              }
            });
          }, err => { console.log(err); }
        );
  }

  getStore( arrStores: [any], id ): void{
    this.currentStore = arrStores.find( store => store._id === id );
    console.log('current store: ', this.currentStore);
  }

  getPage( pageId ): void {
    this.toggleButton = false;
    this.storeHtml = '';
    this.routerNav.navigateByUrl(`/companies/${this.urlId}/pages/${pageId}`);
    this.currentPage = this.currentStore.pages.find( page => page._id === pageId );
    this.getHtml( this.currentPage.codeBlock.htmlBlocks );
    // this.storeStyle = this.__sanitazer.bypassSecurityTrustHtml(this.currentPage.codeBlock.css);
    this.storeStyle = this.currentPage.codeBlock.css;
    const css = this.storeStyle;

    const head = document.getElementsByTagName('head')[1];                  // agregar estilos
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }

  getHtml( arregloHtml ): void {
    let tempHtml = '';
    tempHtml +=
    arregloHtml.forEach( html => {
      switch ( html.tipo ) {
        case 1 : {
          for ( const content of html.contenido ) {
            tempHtml += `<div class="row"><div class="col-12">`;
            tempHtml += content.htmlObj;
            tempHtml += `</div></div>`;
          }
          break;
        }
        case 2 : {
          for ( let i = 0; i < html.contenido.length; i++ ) {
            if ( i === 0) { tempHtml += `<div class="row">`; }
            tempHtml += `<div class="col-6">`;
            tempHtml += html.contenido[i].htmlObj;
            tempHtml += `</div>`;
            if ( i === (html.contenido.length - 1)) { tempHtml += `</div>`; }
          }
          break;
        }
        case 3 : {
          for ( let i = 0; i < html.contenido.length; i++ ) {
            if ( i === 0) { tempHtml += `<div class="row">`; }
            tempHtml += `<div class="col-4">`;
            tempHtml += html.contenido[i].htmlObj;
            tempHtml += `</div>`;
            if ( i === (html.contenido.length - 1)) { tempHtml += `</div>`; }
          }
          break;
        }
      }
      if ( tempHtml === '' ) { console.log('Oops, pagina vacia'); }
      this.storeHtml = this.__sanitazer.bypassSecurityTrustHtml(tempHtml);
    });
  }

  shop(): void {
    if ( !this.toggleButton ) { this.toggleButton = true; }
  }

}
