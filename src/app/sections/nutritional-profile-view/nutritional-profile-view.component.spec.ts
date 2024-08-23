import { NutritionalProfileComponent } from './../../components/nutritional-profile/nutritional-profile.component';
import { NutritionalProfileViewComponent } from './nutritional-profile-view.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NutritionalProfileService } from '../../services/nutritional-profile.service';
import { MatTableModule } from '@angular/material/table';

describe('NutritionalProfileComponentView', () => {
  let component: NutritionalProfileViewComponent;
  let fixture: ComponentFixture<NutritionalProfileViewComponent>;
  let nutritionalProfileService: NutritionalProfileService;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionalProfileViewComponent, NutritionalProfileComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule,
        MatTableModule
      ],
      providers: [ NutritionalProfileViewComponent, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {
              'id': '1'
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

    fixture = TestBed.createComponent(NutritionalProfileViewComponent);
    component = fixture.componentInstance;
    nutritionalProfileService = fixture.debugElement.injector.get(NutritionalProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
