import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoComponent } from './dato.component';

describe('DatoComponent', () => {
  let component: DatoComponent;
  let fixture: ComponentFixture<DatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
