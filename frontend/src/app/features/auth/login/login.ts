import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../../core/auth-service';
import { BrandHeader } from '../../../shared/components/brand-header/brand-header';
import { Button } from '../../../shared/components/button/button';
import { TextField } from '../../../shared/components/text-field/text-field';
import { LoginData } from '../../../shared/models/auth.model';

@Component({
  selector: 'app-login',
  imports: [BrandHeader, FormField, TextField, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly loginModel = signal<LoginData>({
    email: '',
    password: ''
  });

  readonly loginForm = form(this.loginModel);

  onSubmit(event: Event): void {
    event.preventDefault();

    const { email, password } = this.loginForm().value();
    this.authService.login({ email, password }).pipe(
      switchMap(() => this.router.navigate(['/']))
    ).subscribe();
  }
}
