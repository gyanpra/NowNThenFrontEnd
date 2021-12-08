import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@nownthenfrontend/products';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[]=[];
  categories: Category[]=[];
  // checked:Boolean = true;
  isCategoryPage: boolean = false;
  constructor(private productsService:ProductsService, private categoriesService:CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? this.isCategoryPage = true : this.isCategoryPage = false;
    });

    // this._getProducts();
    this._getCategories();


  }

  private _getProducts(categoryFilter?: string[] | any){
    this.productsService.getProducts(categoryFilter).subscribe(resProducts=>{
      this.products =resProducts;
    })
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(resCategories=>{
      this.categories = resCategories;
      console.log(this.categories)

    })
  }

  categoryFilter(){
    const selectedCategories = this.categories.filter(Category=>Category.checked).map((Category)=>Category.id);
    console.log(selectedCategories);
    this._getProducts(selectedCategories);

  }

}
