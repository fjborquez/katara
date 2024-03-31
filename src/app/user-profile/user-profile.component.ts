import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent {
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
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    let userId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.userProfileService.add(userId, this.userProfileForm.value).subscribe(() => {
      alert('User profile added!');
    },
    (error) => {
      alert(error.error.message);
    });
  }
}
