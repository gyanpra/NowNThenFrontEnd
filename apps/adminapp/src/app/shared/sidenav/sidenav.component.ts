import { Component, OnInit } from '@angular/core';
import { AuthService } from 'libs/users/src/lib/services/auth.service';

@Component({
  selector: 'adminapp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authService.logOut();
  }


}
