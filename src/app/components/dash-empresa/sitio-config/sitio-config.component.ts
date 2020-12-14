import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-sitio-config',
  templateUrl: './sitio-config.component.html',
  styleUrls: ['./sitio-config.component.css']
})
export class SitioConfigComponent implements OnInit {

  htmlCode: string;

  cssCode: string;                // guardaria el css general de la pagina
  jsCode: string;                 // guardaria el Javascript general de la pagina

  frame: any;                     // variable que almacena elemento div
  elementoSelec: any;             // value de tipo de div seleccionado (checkbox)
  verModal = false;               // ver modal
  checkDiv: boolean;              // marcar checkbox div por defecto
  arregloHtml: Iframes[] = [];    // arreglo temporal que almacena los frames
  selecFrame = '';                // agregar clase a cuadro seleccionado
  idArrDiv: number;               // id de bloque seleccionado
  contArrDiv: number;             // id de segmento de bloque seleccionado
  codeMirrorXml: string;

  storeId: string;
  pageId: string;
  auth: any;

  constructor( private storesService: StoresService ) { }

  ngOnInit(): void {
    this.pageId = this.storesService.page;

    this.auth = localStorage.getItem('token');
    this.storesService.getUserStore(this.auth)
    .subscribe( res => {
      console.log(res);
      this.storeId = res.storeUser._id;
      console.log(this.storeId);
    }, err => {
      console.log(err);
    });
   }

  guardarContenido(): void{
    const data = {
      js: this.jsCode,
      css: this.cssCode,
      htmlBlocks: this.arregloHtml
     };
    console.log(data);
    this.storesService.addCode( this.auth, this.storeId, this.pageId, data )
        .subscribe( resp => {
          console.log(resp);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1300
          });
        }, err => {
          console.log(err);
        });
  }

  // ===============================================
  // Logica de la cofiguracion
  // ===============================================

  contenidoCodigo(contHtml, contCss: any = '<style></style>', contJs?): void {
    this.htmlCode = contHtml.value;
    this.cssCode  = `<style>${contCss.value}</style>`;
    this.jsCode   = contJs.value;

    if (this.frame !== undefined) {
      const output: any = this.frame;
      output.contentDocument.body.innerHTML = "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'>";
      output.contentDocument.body.innerHTML += this.htmlCode + this.cssCode;
      output.contentDocument.body.innnerHTML += `<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                                                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>`;
      output.contentWindow.eval(this.jsCode);
      this.frame.className = '';
      this.arregloHtml[this.idArrDiv].contenido[this.contArrDiv].htmlObj = contHtml.value;

      console.log('html', this.arregloHtml);
      console.log('css', this.cssCode);
      console.log('js', this.jsCode);
    }
  }

  selector(id): void {                                                           // devuelve frame seleccionado
    const codigoId   = id.split('-');
    this.idArrDiv    = parseInt(codigoId[1]);                                    // tslint:disable-line
    this.contArrDiv  = parseInt(codigoId[2]);                                    // tslint:disable-line
    const x = document.getElementsByClassName('seleccionado');                   // remover clase a los elementos anteriores

    for( let i = 0; i < x.length; i++ ) {
      document.getElementsByClassName('seleccionado')[i].className = 'vacio';
    }

    document.getElementById(id).className = 'seleccionado';                      // agregar clase
    this.frame = document.getElementById(id);
    this.codeMirrorXml = this.arregloHtml[this.idArrDiv].contenido[this.contArrDiv].htmlObj;
    console.log(this.codeMirrorXml);
  }

  radioSeleccionado(event: any): void {
    this.elementoSelec = event.target.value;
    this.checkDiv = false;
  }

  abrirModal(): void {
    if (0) {
      this.verModal      = false;
    } else {
      this.verModal      = true;
      this.elementoSelec = '1';
    }
    this.checkDiv        = true;                                                 // ubicar checkbox en primer elemento por defecto
  }

  aggContenido(): void {
    switch (this.elementoSelec) {
      case '1': {
        this.arregloHtml.push({
          id: this.arregloHtml.length,
          tipo: 1,
          contenido: [
            { htmlObj: '', orden: 0 }
          ]
        });
        break;
      }
      case '2': {
        this.arregloHtml.push({
          id: this.arregloHtml.length,
          tipo: 2,
          contenido: [
            { htmlObj: '', orden: 0 },
            { htmlObj: '', orden: 1 }
          ]
        });
        break;
      }
      case '3': {
        this.arregloHtml.push({
          id: this.arregloHtml.length,
          tipo: 3,
          contenido: [
            { htmlObj: '', orden: 0 },
            { htmlObj: '', orden: 1 },
            { htmlObj: '', orden: 2 }
          ]
        });
        break;
      }
      default: {
        this.arregloHtml.push({
          id: this.arregloHtml.length,
          tipo: 1,
          contenido: [
            { htmlObj: '', orden: 1 }
          ]
        });
        break;
      }
    }
    console.log(this.arregloHtml);
  }
}

interface Iframes {
  id: number;
  tipo: number;
  contenido:
  {
    orden: number;
    htmlObj: string;
  }[]
}
