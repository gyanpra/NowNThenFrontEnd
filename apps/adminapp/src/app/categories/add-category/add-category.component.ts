import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@nownthenfrontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'nownthenfrontend-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form!: FormGroup;
  isSubmitted:Boolean=false;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoriesService, private messageService: MessageService, private location: Location) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted=true;

    if(this.form.invalid) {
      return;  
  }
  const category: Category = {
    name: this.form.value.name,
    icon: this.form.value.icon
  };
  
  this.categoryService.addCategory(category).subscribe(
    (data) => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Category added successfully'});
      console.log(data);
      timer(1500).subscribe(() => {
        this.messageService.clear();
        this.location.back();
      });
    },
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error adding category'});
      console.log(error);
    }
  );

  
}

  get categoryform() {
    return this.form.controls;
  }





}
