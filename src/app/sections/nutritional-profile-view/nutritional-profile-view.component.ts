import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ListResponse } from 'src/app/models/list-response.model';
import { NutritionalProfileDetail } from 'src/app/models/nutritional-profile-detail.model';
import { NutritionalProfileService } from '../../services/nutritional-profile.service';

@Component({
  selector: 'app-nutritional-profile-view',
  templateUrl: './nutritional-profile-view.component.html',
  styleUrls: ['./nutritional-profile-view.component.sass']
})
export class NutritionalProfileViewComponent implements OnInit {
  nutritionalProfileForm: FormGroup = this.formBuilder.group({});
  userId = 0;
  nutritionalProfile: NutritionalProfileDetail[] = [];
  viewMode = true;

  constructor(
    private formBuilder: FormBuilder,
    private nutritionalProfileService: NutritionalProfileService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.nutritionalProfileService.get(this.userId).subscribe((response: ListResponse<NutritionalProfileDetail>) => {this.nutritionalProfile = response.message});
  }
}
