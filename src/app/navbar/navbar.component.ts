import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = '';

  constructor(
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('userName')!;
    console.log('this.name');
  }

  onLogout() {
    localStorage.clear();
    this.notifyService.showSuccess('User logout successfully', 'Logout');
    this.router.navigateByUrl('login');
  }
}
