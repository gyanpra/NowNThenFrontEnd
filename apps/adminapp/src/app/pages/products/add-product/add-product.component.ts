import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@nownthenfrontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'adminapp-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  editMode: boolean = false;
  isSubmitted: Boolean = false;
  form!: FormGroup;
  categories: any[] = [];
  imageSource!: string | ArrayBuffer;
  currentProductID!: string;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoriesService, private productsService: ProductsService, private messageService: MessageService, private location: Location, private router: ActivatedRoute ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }


  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: [false],


    });
  }

  private _getCategories(){
    this.categoryService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      }
    )
  }
  

  get productForm(){
    return this.form.controls;
  }


  private _addProduct(productData: FormData) {
    this.productsService.addProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${product.name} Added successfully`,
        });
        console.log(Product);
        timer(1500).subscribe(() => {
          this.messageService.clear();
          this.location.back();
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error adding Product',
        });
        console.log(error);
      }
    );
  }


  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const productFormData =  new FormData();

    Object.keys(this.productForm).map(key => {
      productFormData.append(key, this.form.controls[key].value);
    });
    if(this.editMode){
      this._updateProduct(productFormData);
    }else{
      this._addProduct(productFormData);
    } 

  }


onImageUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.form.patchValue({
      image: file
    });
    //this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSource = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
private _checkEditMode(){
  this.router.params.subscribe((params) => {
    if (params.id) {
      this.editMode = true;
      this.currentProductID = params.id;
      this.productsService.getProduct(params.id).subscribe((product) => {
        this.productForm.name.setValue(product.name);
        this.productForm.brand.setValue(product.brand);
        this.productForm.category.setValue(product.category?.id);
        this.productForm.stock.setValue(product.stock);
        this.productForm.price.setValue(product.price);
        this.productForm.description.setValue(product.description);
        this.productForm.isFeatured.setValue(product.isFeatured);
        this.imageSource = product.image as string;
        this.productForm.image.setValidators([]);
        this.productForm.image.updateValueAndValidity();

      });
    }
  });
}

private _updateProduct(productFormData: FormData) {
  this.productsService.updateProduct(productFormData,this.currentProductID).subscribe(
    () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product Updated successfully`,
      });
      timer(1500).subscribe(() => {
        this.messageService.clear();
        this.location.back();
      });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error adding category',
      });
    }
  );
}
}


