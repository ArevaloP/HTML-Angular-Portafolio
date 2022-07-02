import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from '../../services/productos.service';
import { Detalle } from '../../interfaces/detalle.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto!: Detalle;
  id: string = '';

  constructor( private route: ActivatedRoute,
                public productoService: ProductosService ) { }

  ngOnInit(): void {

    this.route.params.subscribe( params =>{

      this.productoService.getProducto(params['id'])
            .subscribe( (producto: Detalle)=>{
              this.id = params['id'];
              this.producto = producto;

            });

    } );

  }

}
