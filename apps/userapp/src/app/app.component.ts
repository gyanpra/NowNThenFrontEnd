import { Component, OnInit } from '@angular/core';
import { UsersService } from '@nownthenfrontend/users';

@Component({
  selector: 'userapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.initAppSession();
  }

  title = 'userapp';
}
