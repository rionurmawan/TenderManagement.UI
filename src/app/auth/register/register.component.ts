import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifyService: NotificationService
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  validatePassword(form: AbstractControl): ValidationErrors | null {
    const p: string = form.get('password')!.value;
    const cp: string = form.get('confirmPassword')!.value;
    let errors: ValidationErrors = {};

    if (p != cp) {
      errors['mustmatch'] = 'Password and confirm password must match';
    }

    return errors;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        phoneNumber: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.validatePassword }
    );
  }

  onCreate() {
    this.submitted = true;
    console.log(this.registerForm.value);

    this.authService.signUp(this.registerForm.value).subscribe({
      next: (data) => {
        this.notifyService.showSuccess(
          'User created succesfully',
          'Success'
        );
        this.router.navigateByUrl('login');
      },
      error: (error) => {
        this.notifyService.showError(
          error.error.errors,
          'Error'
        );
        console.log(error.error.errors);
      },
    });
  }
}
