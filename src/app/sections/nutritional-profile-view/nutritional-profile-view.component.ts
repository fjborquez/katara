import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '../../services/user-profile.service';
import { NutritionalRestrictionService } from '../../services/nutritional-restriction.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-nutritional-profile-view',
  templateUrl: './nutritional-profile-view.component.html',
  styleUrls: ['./nutritional-profile-view.component.sass']
})
export class NutritionalProfileViewComponent {
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
    const userId = this.route.snapshot.params['id'];

    this.userProfileForm = this.formBuilder.group({});
    this.nutritionalRestrictionService.list().pipe(
      tap((nutritionalRestrictions:any) => {
        this.nutritionalRestrictions = nutritionalRestrictions;

        this.nutritionalRestrictions.forEach((nutritionalRestriction: any) => {
          this.userProfileForm.addControl('nutritionalProfile[' + nutritionalRestriction.id + ']', this.formBuilder.control(false));
        });
      }),
      tap(() => {
        this.userProfileService.get(userId).subscribe((userProfile: any) => {
          const nutritionalProfile:any = [];
          for (const key in userProfile) {
            const newKey = "nutritionalProfile[" + userProfile[key].id + "]";
            nutritionalProfile[newKey] = true;
          }
          this.userProfileForm.patchValue(nutritionalProfile);
        })
      }
    )).subscribe();
  }
}
