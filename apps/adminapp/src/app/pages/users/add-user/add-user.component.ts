import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@nownthenfrontend/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'adminapp-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  editMode: boolean = false;
  form!: FormGroup;
  isSubmitted: Boolean = false;
  isAdmin: boolean = false;
  currentUserID!: string;

  

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private messageService: MessageService, private location: Location, private router: ActivatedRoute ) { }


  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
  }

  private _initUserForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      password: ['', Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      isAdmin: [false],
      state: [''],
      address: [''],
      city: [''],
      pincode: ['']
    })
  }

  private _checkEditMode(){
    this.router.params.subscribe((params)=>{
      if(params.id){
        this.editMode = true;
        this.currentUserID = params.id;
        this.usersService.getUser(params.id).subscribe((user)=>
        {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.address.setValue(user.address);
          this.userForm.phone.setValue(user.phone);
          this.userForm.pincode.setValue(user.pincode);
          this.userForm.state.setValue(user.state);
          this.userForm.city.setValue(user.city);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })


      }
    })

  }
  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${user.name} Added successfully`,
        });
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

  

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserID,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      address: this.userForm.address.value,
      city: this.userForm.city.value,
      state: this.userForm.state.value,
      pincode: this.userForm.pincode.value
      
    };
    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }


  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${user.name} Updated successfully`,
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


get userForm() {
  return this.form.controls;
}

}
