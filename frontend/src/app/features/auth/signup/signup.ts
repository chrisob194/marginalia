import { Component, inject, signal } from '@angular/core';
import { apply, form, FormField, submit, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../core/auth-service';
import { BrandHeader } from '../../../shared/components/brand-header/brand-header';
import { Button } from "../../../shared/components/button/button";
import { TextField } from '../../../shared/components/text-field/text-field';
import { SignupData } from '../../../shared/models/auth.model';
import { emailSchema } from '../../../shared/validators/email.schema';
import { passwordSchema } from '../../../shared/validators/password.schema';

@Component({
  selector: 'app-signup',
  imports: [BrandHeader, FormField, TextField, Button],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly signupModel = signal<SignupData>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  readonly signupForm = form(this.signupModel, schemaPath => {
    apply(schemaPath.email, emailSchema);
    apply(schemaPath.password, passwordSchema);

    validate(schemaPath.confirmPassword, ({ value, valueOf, state }) => {

      if (!state.touched) {
        return null;
      }

      const confirmPassword = value();
      const password = valueOf(schemaPath.password);

      if (confirmPassword === password) {
        return null;
      }

      return {
        kind: 'passwordMismatch',
        message: 'Passwords do not match.'
      };
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.signupForm, async (form) => {
      try {
        await firstValueFrom(this.authService.signup(form().value()));
        await this.router.navigate(['/']);
      } catch (error) {
        // TODO: improve with some dialog that shows the error. Backend first!
        alert(error);
      }
    });
  }
}
