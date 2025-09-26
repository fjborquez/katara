import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ListResponse } from 'src/app/models/list-response.model';
import { NutritionalProfileComponent } from 'src/app/components/nutritional-profile/nutritional-profile.component';
import { NutritionalProfileDetail } from 'src/app/models/nutritional-profile-detail.model';
import { NutritionalProfileService } from '../../services/nutritional-profile.service';

@Component({
    selector: 'app-nutritional-profile-view',
    templateUrl: './nutritional-profile-view.component.html',
    styleUrls: ['./nutritional-profile-view.component.sass'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      NutritionalProfileComponent,
      RouterLink
    ]
})
export class NutritionalProfileViewComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private nutritionalProfileService = inject(NutritionalProfileService);
  private route = inject(ActivatedRoute);

  nutritionalProfileForm: FormGroup = this.formBuilder.group({});
  userId = 0;
  nutritionalProfile: NutritionalProfileDetail[] = [];
  viewMode = true;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.nutritionalProfileService.get(this.userId).subscribe((response: ListResponse<NutritionalProfileDetail>) => {this.nutritionalProfile = response.message});
  }
}
