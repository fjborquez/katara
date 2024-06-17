import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserDeleteComponent } from './confirm-user-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

describe('ConfirmUserDeleteComponent', () => {
  let component: ConfirmUserDeleteComponent;
  let fixture: ComponentFixture<ConfirmUserDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        RouterModule.forRoot([])
      ],
      declarations: [ ConfirmUserDeleteComponent ],
      providers: [
        {
          provide: MatDialogRef, useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: []
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmUserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
