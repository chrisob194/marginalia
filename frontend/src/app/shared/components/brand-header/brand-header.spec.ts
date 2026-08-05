import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchHeader } from './branch-header';

describe('BranchHeader', () => {
  let component: BranchHeader;
  let fixture: ComponentFixture<BranchHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
