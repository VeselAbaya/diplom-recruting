import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import { debounceTime, filter, map } from 'rxjs/operators';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { RelationsService } from '@modules/search/relations.service';
import { ProfileService } from '@modules/profile/profile.service';
import { SearchParamsService } from '@modules/search/search-params/search-params.service';
import { FORM_DEBOUNCE } from '@shared/constants';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent extends OnDestroyMixin {
  readonly RelationType = RelationType;
  readonly WorkSchedule = WorkSchedule;
  readonly WorkType = WorkType;
  readonly EnglishLevel = EnglishLevel;

  form = new FormGroup({
    search: new FormControl(),
    rateRange: new FormControl(),
    networkSize: new FormControl(),
    relationTypes: new FormControl(),
    experience: new FormControl(),
    english: new FormControl(),
    workSchedule: new FormControl(),
    workType: new FormControl()
  });

  constructor(public readonly profile: ProfileService,
              public readonly relations: RelationsService,
              private readonly searchParams: SearchParamsService) {
    super();
    this.reset();

    this.form.valueChanges.pipe(
      untilComponentDestroyed(this),
      filter(() => this.form.valid),
      debounceTime(FORM_DEBOUNCE),
      map(formValue => ({
        search: formValue.search,
        hourlyRateMin: formValue.rateRange.min,
        hourlyRateMax: formValue.rateRange.max,
        networkSize: formValue.networkSize,
        relationTypes: formValue.relationTypes,
        experience: formValue.experience,
        english: formValue.english,
        workSchedule: formValue.workSchedule,
        workType: formValue.workType
      }))
    ).subscribe(val => this.searchParams.patch(val));
  }

  reset(): void {
    this.form.reset({
      search: '',
      rateRange: {min: 0, max: null},
      networkSize: 1,
      relationTypes: [],
      experience: 0,
      english: EnglishLevel.A1,
      workSchedule: null,
      workType: null
    });
  }
}
