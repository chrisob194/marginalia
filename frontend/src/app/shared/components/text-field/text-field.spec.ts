import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Injector, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { TextField } from './text-field';

describe('TextField', () => {
  let component: TextField;
  let fixture: ComponentFixture<TextField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextField],
    }).compileComponents();

    fixture = TestBed.createComponent(TextField);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', 'test');
    fixture.componentRef.setInput('label', 'Test');

    const model = signal({ test: '' });
    const testForm = form(model, (path) => required(path.test), { injector: TestBed.inject(Injector) });
    fixture.componentRef.setInput('formField', testForm.test);

    await fixture.whenStable();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
