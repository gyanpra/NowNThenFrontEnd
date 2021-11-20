import { Component, OnInit } from '@angular/core';
import { Category, CategoriesService } from '@nownthenfrontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {Location} from '@angular/common';


@Component({
  selector: 'nownthenfrontend-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[]=[];

  constructor(private categoryService: CategoriesService, private messageService: MessageService, private location: Location) { }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }
    );
  }

  deleteCategory(categoryid: string){
    this.categoryService.deleteCategory(categoryid).subscribe((response)=>{
      this.categories = this.categories.filter(category => category.id !== categoryid);
      this.messageService.add({severity:'success', summary:'Success', detail:'Category deleted successfully'});
    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Error deleting category'});
    }
    );
  }

}
