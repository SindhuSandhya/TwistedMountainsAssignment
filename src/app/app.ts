import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from "./components/home/users-list/users-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'twisted-mountain-users-list';
}
