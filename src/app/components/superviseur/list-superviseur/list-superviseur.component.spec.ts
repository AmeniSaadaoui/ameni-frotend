import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuperviseurComponent } from './list-superviseur.component';

describe('ListSuperviseurComponent', () => {
  let component: ListSuperviseurComponent;
  let fixture: ComponentFixture<ListSuperviseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSuperviseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSuperviseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
