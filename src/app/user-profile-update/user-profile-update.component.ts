import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.sass']
})
export class UserProfileUpdateComponent {
  userProfileForm = this.formBuilder.group({
    date_of_birth: '',
    is_vegetarian: false,
    is_vegan: false,
    is_celiac: false,
    is_keto: false,
    is_diabetic: false,
    is_lactose: false,
    is_gluten: false,
  });

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    let userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userProfileService.get(userId).subscribe((data) => {
      this.userProfileForm.patchValue(data);
    })
  }

  onSubmit(): void {
    let userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userProfileService.put(userId, this.userProfileForm.value).subscribe(() => {
      this.router.navigate(['/users']).then(() => {
        this.snackBar.open("User profile modified", "Close");
      });
    },
    (error: any) => {
      this.snackBar.open(error.error.message, "Close");
    });
  }
}
