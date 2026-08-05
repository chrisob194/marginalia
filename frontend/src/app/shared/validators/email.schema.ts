import { debounce, email, required, schema } from "@angular/forms/signals";

export const emailSchema = schema<string>(path => {
  debounce(path, 400);
  required(path, { message: 'Email is required.' });
  email(path, { message: 'Insert a valid email.' });
});