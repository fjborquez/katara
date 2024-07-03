import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

import { ListResponse } from 'src/app/models/list-response.model';
import { NutritionalRestriction } from 'src/app/models/nutritional-restriction.model';
import { NutritionalRestrictionService } from 'src/app/services/nutritional-restriction.service';

@Component({
  selector: 'app-nutritional-profile',
  templateUrl: './nutritional-profile.component.html',
  styleUrls: ['./nutritional-profile.component.sass']
})
export class NutritionalProfileComponent {
  @Input() defaultValues: NutritionalRestriction[] = [];
  restrictions: NutritionalRestriction[] = [];
  form: FormGroup = this.formBuilder.group({});

  constructor(
    private nutritionalRestrictionService: NutritionalRestrictionService,
    private rootFormGroup: FormGroupDirective,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.rootFormGroup.control;

    this.nutritionalRestrictionService.list().subscribe((response: ListResponse<NutritionalRestriction>) => {
      this.restrictions = response.message;

      this.restrictions.forEach((nutritionalRestriction: NutritionalRestriction) => {
        if (this.defaultValues.find(restriction => restriction.id === nutritionalRestriction.id)) {
          this.form.addControl(`nutritionalProfile['${nutritionalRestriction.id}']`, this.formBuilder.control(true));
        } else {
          this.form.addControl(`nutritionalProfile['${nutritionalRestriction.id}']`, this.formBuilder.control(false));
        }
      });
    });
  }

  ngDoCheck() {
    this.defaultValues.forEach((defaultValue: NutritionalRestriction) => {
      this.form.get(`nutritionalProfile['${defaultValue.id}']`)?.patchValue(true);
    });
  }
}
