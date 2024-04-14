import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '../user-profile.service';
import { NutritionalRestrictionService } from '../nutritional-restriction.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent {
  userProfileForm: any;
  nutritionalRestrictions: any;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private nutritionalRestrictionService: NutritionalRestrictionService
  ) {}

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({});
    this.nutritionalRestrictionService.list().subscribe(nutritionalRestrictions => {
      this.nutritionalRestrictions = nutritionalRestrictions;

      this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
        this.userProfileForm.addControl(nutritionalRestriction.description, this.formBuilder.control(false));
      });
    });
  }

  onSubmit(): void {

  }
}
