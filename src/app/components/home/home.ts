import { Component } from '@angular/core';
import { UsersList } from "./users-list/users-list";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
