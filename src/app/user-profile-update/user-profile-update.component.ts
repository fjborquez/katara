import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '../user-profile.service';
import { NutritionalRestrictionService } from '../nutritional-restriction.service';

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
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private nutritionalRestrictionService: NutritionalRestrictionService
  ) {}

  ngOnInit(): void {
    /*let userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userProfileForm = this.formBuilder.group({});

    this.nutritionalRestrictionService.list().subscribe((nutritionalRestrictions: any) => {
      this.nutritionalRestrictions = nutritionalRestrictions;

      this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
        this.userProfileForm.addControl(nutritionalRestriction.description, this.formBuilder.control(false));
      });
    });

    this.userProfileService.get(userId).subscribe((data) => {
      this.userProfileForm.patchValue(data);
    })*/
  }

  onSubmit(): void {
    /*let userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userProfileService.put(userId, this.userProfileForm.value).subscribe(() => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open("User profile updated", "Close");
      });
    },
    (error: any) => {
      this.snackBar.open(error.error.message, "Close");
    });*/
  }
}
