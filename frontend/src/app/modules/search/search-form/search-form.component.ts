import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  EnglishLevel,
  ISearchParamsDto,
  WorkSchedule,
  WorkType
} from '@monorepo/types/search/search-params.dto.interface';
import { SearchService } from '@modules/search/search.service';
import { debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ExperienceSliderConfig } from '@shared/experience-slider.config';
import { Subject } from 'rxjs';
import { equals } from 'ramda';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent extends OnDestroyMixin {
  readonly WorkSchedule = WorkSchedule;
  readonly WorkType = WorkType;
  readonly EnglishLevel = EnglishLevel;
  readonly ExperienceSliderConfig = ExperienceSliderConfig;

  @Output() readonly valueChanges = new Subject<Omit<ISearchParamsDto, 'fromUserId'>>();

  form = new FormGroup({
    search: new FormControl(''),
    rateRange: new FormControl({min: 0, max: null}),
    networkSize: new FormControl(1),
    experience: new FormControl(0),
    english: new FormControl(EnglishLevel.A1),
    workSchedule: new FormControl(null),
    workType: new FormControl(null)
  });

  constructor(private readonly search: SearchService) {
    super();
    this.form.valueChanges.pipe(
      untilComponentDestroyed(this),
      debounceTime(500),
      filter(() => this.form.valid),
      distinctUntilChanged((a, b) => equals(a, b)),
      map(formValue => ({
        search: formValue.search,
        hourlyRateMin: formValue.rateRange.min,
        hourlyRateMax: formValue.rateRange.max,
        networkSize: formValue.networkSize,
        experience: formValue.experience,
        english: formValue.english,
        workSchedule: formValue.workSchedule,
        workType: formValue.workType
      }))
    ).subscribe(params => this.valueChanges.next(params));

    search.params$.pipe(
      take(1),
      untilComponentDestroyed(this)
    ).subscribe(params =>
      this.form.setValue({
        search: params.search,
        rateRange: {min: params.hourlyRateMin, max: params.hourlyRateMax},
        networkSize: params.networkSize,
        experience: params.experience,
        english: params.english,
        workSchedule: params.workSchedule,
        workType: params.workType
      }
    ));
  }

  onReset(): void {
    this.form.reset({
      search: '',
      rateRange: {min: 0, max: null},
      networkSize: 1,
      experience: 0,
      english: EnglishLevel.A1,
      workSchedule: null,
      workType: null
    });
  }
}
