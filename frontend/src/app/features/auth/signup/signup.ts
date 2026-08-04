import { Component, signal } from '@angular/core';
import { apply, form, FormField, validate } from '@angular/forms/signals';
import { BrandHeader } from '../../../shared/brand-header/brand-header';
import { Button } from "../../../shared/button/button";
import { TextField } from '../../../shared/forms/components/text-field/text-field';
import { emailSchema } from '../../../shared/forms/validators/email.schema';
import { passwordSchema } from '../../../shared/forms/validators/password.schema';
import { SignupData } from '../models/auth.model';

@Component({
  selector: 'app-signup',
  imports: [BrandHeader, FormField, TextField, Button],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  signupModel = signal<SignupData>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  signupForm = form(this.signupModel, schemaPath => {
    apply(schemaPath.email, emailSchema);
    apply(schemaPath.password, passwordSchema);

    validate(schemaPath.confirmPassword, ({ value, valueOf }) => {
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

    const formData = this.signupModel();
    console.log('form data:', formData);
  }
}
