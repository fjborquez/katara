import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalProfileComponent } from './nutritional-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroupDirective } from '@angular/forms';

describe('NutritionalProfileComponent', () => {
  let component: NutritionalProfileComponent;
  let fixture: ComponentFixture<NutritionalProfileComponent>;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        FormGroupDirective,
        FormBuilder,
        {provide: FormGroupDirective, useValue: formGroupDirective}
      ],
      declarations: [ NutritionalProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
