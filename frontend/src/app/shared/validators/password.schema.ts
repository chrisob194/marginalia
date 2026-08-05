import { debounce, maxLength, minLength, pattern, required, schema } from "@angular/forms/signals";

export const passwordSchema = schema<string>(path => {
  debounce(path, 400);
  
  required(path, { message: 'Password is required.' });
  minLength(path, 8, { message: 'Minimum password length is 8.' });
  maxLength(path, 64, { message: 'Maximum password length is 64.' });

  // at least one lowercase letter
  pattern(path, /[a-z]/, { message: 'At least one lowercase letter is required.' });

  // at least one uppercase letter
  pattern(path, /[A-Z]/, { message: 'At least one uppercase letter is required.' });

  // at least one number
  pattern(path, /[0-9]/, { message: 'At least one number is required.' });

  // at least one special character
  pattern(path, /[^A-Za-z0-9]/, { message: 'At least one special character is required.' });

  // no space
  pattern(path, /^\S*$/, { message: 'No whitespaces are allowed.' });
});