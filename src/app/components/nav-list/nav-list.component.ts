import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css'
})
export class NavListComponent {
  protected readonly navItems: ReadonlyArray<
    Readonly<{
      name: string,
      routerLink: string,
      icon: string
    }>
  > = [
      {
        name: 'Video Editor',
        routerLink: '/video-editor',
        icon: 'videocam'
      },
      {
        name: 'About',
        routerLink: '/about',
        icon: 'info'
      }
    ];
}
