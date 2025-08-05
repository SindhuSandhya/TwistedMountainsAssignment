import { Component } from '@angular/core';
import { Users } from '../../../services/users';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css'
})
export class UserDetails {

  user: any;
  constructor(private users: Users, private location: Location) {}

  ngOnInit() {
    this.user = history.state.user;
  }

  goBack() {
    this.location.back();
  }

}
