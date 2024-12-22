import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NutritionalProfileComponent } from './../../components/nutritional-profile/nutritional-profile.component';
import { NutritionalProfileService } from '../../services/nutritional-profile.service';
import { NutritionalProfileViewComponent } from './nutritional-profile-view.component';

describe('NutritionalProfileComponentView', () => {
  let component: NutritionalProfileViewComponent;
  let fixture: ComponentFixture<NutritionalProfileViewComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
