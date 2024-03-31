import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { NavListComponent } from './components/nav-list/nav-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppShellComponent,
    NavListComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
