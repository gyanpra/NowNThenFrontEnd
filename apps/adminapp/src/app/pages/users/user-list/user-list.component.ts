import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User,UsersService} from '@nownthenfrontend/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Location} from '@angular/common';


@Component({
  selector: 'adminapp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private router:Router, private confirmationService: ConfirmationService,private usersService: UsersService, private messageService: MessageService, private location: Location) { }

  ngOnInit(): void {
    this._getUsers();
  }

  editUser(userid: string) {
    this.router.navigate([`users/add/${userid}`]);
  }


  deleteUser(userid: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userid).subscribe((response) => {
          
      },

        () => {
          this._getUsers();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'user deleted successfully' });
          
        },
        () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting User' });
        }
      
        );

      }
    });
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
