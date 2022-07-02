import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producto } from '../interfaces/producto.interface';
import { Detalle } from '../interfaces/detalle.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  productosFiltrado: Producto[] = [];


  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise((resolve, reject)=>{
      this.http.get<any[]>('https://angular-html-92429-default-rtdb.firebaseio.com/productos_idx.json')
            .subscribe((resp: Producto[])=>{
              this.productos = resp;
              this.cargando = false;
              resolve(this.productos);
            });
    });


  }


  getProducto(id: string){

    return this.http.get<Detalle>(`https://angular-html-92429-default-rtdb.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto(termino: string){

    if(this.productos.length === 0){
      //Cargar Productos
      this.cargarProductos().then(()=>{
        //Se ejecuta despues de tener los productos
        this.filtrarProductos(termino);
      });
    }else{
      this.filtrarProductos(termino);
    }


  }

  private filtrarProductos(termino: string){

    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach(prod=>{

      const tituloLower = prod.titulo.toLowerCase();
      const categoriaLower = prod.categoria.toLowerCase();


      if(categoriaLower.indexOf(termino) >=0 || tituloLower.indexOf(termino) >=0){
        this.productosFiltrado.push(prod);
      }
    });
  }


}
