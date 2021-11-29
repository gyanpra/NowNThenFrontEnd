import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService} from '../../services/categories.service';
import {Category} from '../../models/categories';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.css']
})
export class CategoryBannerComponent implements OnInit{

  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(category => {
      this.categories = category;
    });
  }


}
