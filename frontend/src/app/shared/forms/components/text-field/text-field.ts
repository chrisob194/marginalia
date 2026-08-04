import { Component, computed, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-text-field',
  imports: [FormField],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextField {

  id = input.required<string>();

  type = input<string>('text');

  formField = input.required<Field<string>>();

  label = input.required<string>();

  protected state = computed(() => this.formField()());

  protected stateInvalid = computed(() => this.state().touched() && this.state().invalid());

  protected errorMessageId = computed(() => this.id().concat('error'));
}
