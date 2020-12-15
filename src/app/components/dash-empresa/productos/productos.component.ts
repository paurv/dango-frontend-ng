import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { ProductsService } from '../../../services/products.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  categ: boolean;
  categories: any = [];
  auth = localStorage.getItem('token');

  categName: any;
  products: any = [];
  newProduct: any = {};

  constructor( private categoriesService: CategoriasService,
               private productsService: ProductsService ) { }

  ngOnInit(): void {
    if ( this.auth ) {
      this.categoriesService.getCategories( this.auth )
          .subscribe( res => {
            this.categories = res.categories.categories;
          }, err => {
            console.log(err);
          });

      this.productsService.getProducts( this.auth )
          .subscribe( res => {
            console.log( res );
            this.products = res.products.products;
          }, err => {
            console.log( err);
          });
    }
  }

  deleteCateg( delCat ): any {
    Swal.fire({
      title: 'Seguro que quieres eliminar?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isDenied) {
        this.categoriesService.delCateg( this.auth, delCat )
            .subscribe( resp => {
              this.categories = resp.deletedCat.categories;
              Swal.fire('Eliminado con exito', '', 'success');
            }, err => {
              console.log(err);
            });
      }
    });
  }

  addCateg( newName ): any {
    if ( !newName ) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Por favor llene el campo',
        showConfirmButton: true
      });
      return;
    }
    console.log(`Agregar categoria: ${ newName }`);
    const data = { name: newName };
    this.categoriesService.addCateg( this.auth, data )
        .subscribe( resp => {
          this.categories = resp.result.categories;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Agregado con exito',
            showConfirmButton: false,
            timer: 1300
          });
        }, err => {
          console.log(err);
        });
    this.categName = '';
  }

  addProduct( form: NgForm ): void {
    if ( form.invalid ) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Por favor llene todos los campos',
        showConfirmButton: true
      });
      return;
    }
    console.log('data: ', this.newProduct);
    this.productsService.addProduct( this.auth, this.newProduct )
        .subscribe( resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado con exito',
            showConfirmButton: false,
            timer: 1300
          });
          this.products = resp.product.products;
          this.newProduct = {};
        }, err => {
          console.log(err);
        });
  }

  delProduct( idProd ): any {
    Swal.fire({
      title: 'Seguro que quieres eliminar?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isDenied) {
        this.productsService.delProduct( this.auth, idProd)
          .subscribe( res => {
            this.products = res.deletedProd.products;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Eliminado con exito',
              showConfirmButton: false,
              timer: 1500
            });
          }, err => {
            console.log(err);
          });
      }
    });
  }

  editProduct( productoEdit): void{
    console.log('editar producto: ', productoEdit);
    this.newProduct = {
      name: productoEdit.name,
      stock: productoEdit.stock,
      price: productoEdit.price,
      category: productoEdit.category,
    }
    this.categ = false;
  }

}