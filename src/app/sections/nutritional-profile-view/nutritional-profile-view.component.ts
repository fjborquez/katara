import { ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NutritionalProfileService } from '../../services/nutritional-profile.service';
import { NutritionalRestriction } from 'src/app/models/nutritional-restriction.model';

@Component({
  selector: 'app-nutritional-profile-view',
  templateUrl: './nutritional-profile-view.component.html',
  styleUrls: ['./nutritional-profile-view.component.sass']
})
export class NutritionalProfileViewComponent {
  nutritionalProfileForm: FormGroup = this.formBuilder.group({});
  userId = 0;
  nutritionalProfile: NutritionalRestriction[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private nutritionalProfileService: NutritionalProfileService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.nutritionalProfileService.get(this.userId).subscribe((profile: NutritionalRestriction[]) => this.nutritionalProfile = profile);
  }
}
