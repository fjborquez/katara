import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NutritionalProfileComponent } from './../../components/nutritional-profile/nutritional-profile.component';
import { NutritionalProfileService } from '../../services/nutritional-profile.service';
import { NutritionalProfileViewComponent } from './nutritional-profile-view.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NutritionalProfileComponentView', () => {
  let component: NutritionalProfileViewComponent;
  let fixture: ComponentFixture<NutritionalProfileViewComponent>;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NutritionalProfileViewComponent,
        NutritionalProfileComponent,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule,
        MatTableModule,
      ],
      providers: [
        NutritionalProfileViewComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '1',
              },
            },
          },
        },
        FormGroupDirective,
        FormBuilder,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionalProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
