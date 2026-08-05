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

  hint = input<string>();

  autocomplete = input<'email' | 'off' | null>(null);

  private stateInvalid = computed(() => {
    const state = this.formField();
    return state().touched() && state().invalid();
  });

  // shows only the first error message in order not to clutter the user
  protected errorMessage = computed(() => {
    const state = this.formField();
    if (!state().touched()) {
      return '';
    }
    return state().errors().at(0)?.message ?? '';
  })

  protected errorMessageId = computed(() => this.id().concat('-error'));

  protected hintMessageId = computed(() => this.id().concat('-hint'));

  protected ariaInvalid = computed(() => this.stateInvalid() ? true : null);

  protected ariaDescribedBy = computed(() => {
    const ids: string[] = [];

    if (this.hint()) {
      ids.push(this.hintMessageId());
    }

    if (this.stateInvalid()) {
      ids.push(this.errorMessageId());
    }

    return ids.length ? ids.join(' ') : null;
  });
}
