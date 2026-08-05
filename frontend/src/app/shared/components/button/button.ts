import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  type = input.required<'submit' | 'reset' | 'button'>();

  label = input.required<string>();

  disabled = input<boolean>(false);
}
