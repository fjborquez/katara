import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '../../services/user-profile.service';
import { NutritionalRestrictionService } from '../../services/nutritional-restriction.service';

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
        this.userProfileForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
      });
    });
  }

  onSubmit(): void {
    const userId: number = Number(this.route.snapshot.paramMap.get('id'));
    const nutritionalProfile = Object.entries(this.userProfileForm.value).filter((value) => {
      return value[1] === true;
    }).map((value) => {
      return Number(value[0].replace(/\D/g, ''));
    });

    this.userProfileService.add(userId, {nutritionalProfile}).subscribe(response => {
      this.snackBar.open("Nutritional profile created", "Close");
      this.router.navigate(['/persons']);
    });
  }
}
