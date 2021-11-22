import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@nownthenfrontend/products';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'adminapp-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = []

  constructor(private router: Router, private confirmationService: ConfirmationService, private productsService: ProductsService, private messageService: MessageService, private location: Location) { }


  ngOnInit(): void {
    this._getProducts()
  };



  editProduct(productid: string) {
    this.router.navigateByUrl(`products/add/${productid}`);


  }


  deleteProduct(productid: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productid).subscribe((response) => {
          
      },

        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
          this._getProducts();
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting Product' });
        }
      
        );

      }
    });
  }


  private _getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

}
