import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { NutritionalProfileComponent } from 'src/app/components/nutritional-profile/nutritional-profile.component';
import { NutritionalProfileService } from 'src/app/services/nutritional-profile.service';

describe('NutritionalProfileComponentView', () => {
  let component: NutritionalProfileComponent;
  let fixture: ComponentFixture<NutritionalProfileComponent>;
  let nutritionalProfileService: NutritionalProfileService;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionalProfileComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [ NutritionalProfileComponent, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => 1
            }
          }
        }
      },
      FormGroupDirective,
      FormBuilder,
      {provide: FormGroupDirective, useValue: formGroupDirective}

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalProfileComponent);
    component = fixture.componentInstance;
    nutritionalProfileService = fixture.debugElement.injector.get(NutritionalProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
