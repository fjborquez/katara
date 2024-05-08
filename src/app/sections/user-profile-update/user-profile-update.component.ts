import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NutritionalProfileService } from '../../services/nutritional-profile.service';
import { NutritionalRestrictionService } from '../../services/nutritional-restriction.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.sass']
})
export class UserProfileUpdateComponent {
  userProfileForm: any;
  nutritionalRestrictions: any;

  constructor(
    private formBuilder: FormBuilder,
    private nutritionalProfileService: NutritionalProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private nutritionalRestrictionService: NutritionalRestrictionService
  ) {}

  ngOnInit(): void {
    const userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userProfileForm = this.formBuilder.group({});

    this.nutritionalRestrictionService.list().subscribe((nutritionalRestrictions: any) => {
      this.nutritionalRestrictions = nutritionalRestrictions;

      this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
        this.userProfileForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
      });
    });

    this.nutritionalProfileService.get(userId).subscribe((data: any) => {
      const nutritionalProfile:any = [];
      for (const key in data) {
        const newKey = "nutritionalProfile[" + data[key].id + "]";
        nutritionalProfile[newKey] = true;
      }
      this.userProfileForm.patchValue(nutritionalProfile);
    })
  }

  onSubmit(): void {
    const userId: number = Number(this.route.snapshot.paramMap.get('id'));
    const nutritionalProfile = Object.entries(this.userProfileForm.value).filter((value) => {
      return value[1] === true;
    }).map((value) => {
      return Number(value[0].replace(/\D/g, ''));
    });

    this.nutritionalProfileService.update(userId, {nutritionalProfile}).subscribe(response => {
      this.snackBar.open("Nutritional profile updated", "Close");
      this.router.navigate(['/persons']);
    });
  }
}
