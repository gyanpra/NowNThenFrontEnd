import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@nownthenfrontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'adminapp-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})

export class AddCategoryComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: Boolean = false;
  editMode: Boolean = false;
  currentID!: string;


  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });

    this._checkEditMode();
  }



  get categoryform() {
    return this.form.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentID,
      name: this.form.value.name,
      icon: this.form.value.icon,
      color: this.form.value.color,
    };
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }


  private _addCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${category.name} Added successfully`,
        });
        console.log(Category);
        timer(1500).subscribe(() => {
          this.messageService.clear();
          this.location.back();
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error adding category',
        });
        console.log(error);
      }
    );
  }



  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentID = params.id;
        this.categoryService.getCategory(params.id).subscribe((category) => {
          this.form.patchValue({
            name: category.name,
            icon: category.icon,
            color: category.color,
          });
        });
      }
    });
  }
  

  private _updateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${category.name} Updated successfully`,
        });
        console.log(data);
        timer(1500).subscribe(() => {
          this.messageService.clear();
          this.location.back();
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error adding category',
        });
        console.log(error);
      }
    );
  }
}
