import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutorisationSortieComponent } from './list-autorisation-sortie.component';

describe('ListAutorisationSortieComponent', () => {
  let component: ListAutorisationSortieComponent;
  let fixture: ComponentFixture<ListAutorisationSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAutorisationSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAutorisationSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
