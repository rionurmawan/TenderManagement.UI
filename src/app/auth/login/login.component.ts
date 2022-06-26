import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  submitted = false;
  user: UserResponse = {
    isAuthSuccessful: false,
    userDTO: {
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
    },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifyService: NotificationService
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: ['', Validators.required],
    });
  }

  onSignIn() {
    this.submitted = true;
    console.log(this.loginForm.value);

    this.authService.signIn(this.loginForm.value).subscribe({
      next: (data) => {
        this.user = data;
        this.notifyService.showSuccess('Login succesfully', 'Success');

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', this.user.userDTO.id);
        localStorage.setItem('userName', this.user.userDTO.name);

        this.router.navigateByUrl('tender');
      },
      error: (error) => {
        this.notifyService.showError('Invalid Authentication', 'Error');
      },
    });
  }
}
