import { Component, OnInit } from '@angular/core';
import { Category, CategoriesService } from '@nownthenfrontend/products';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'adminapp-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[]=[];

  constructor(private router:Router, private confirmationService: ConfirmationService,private categoryService: CategoriesService, private messageService: MessageService, private location: Location) { }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }
    );
  }

  deleteCategory(categoryid: string){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.categoryService.deleteCategory(categoryid).subscribe((response)=>{
            this.categories = this.categories.filter(category => category.id !== categoryid);
            this.messageService.add({severity:'success', summary:'Success', detail:'Category deleted successfully'});
          },
          (error)=>{
            this.messageService.add({severity:'error', summary:'Error', detail:'Error deleting category'});
          }
          );
        }
      },
    );
  };

  editCategory(categoryid: string){
    this.router.navigateByUrl(`categories/add/${categoryid}`);

    
  }



}
