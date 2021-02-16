import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import { SearchService } from '@modules/search/search.service';
import { debounceTime } from 'rxjs/operators';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ExperienceSliderConfig } from '@shared/experience-slider.config';

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

  form = new FormGroup({
    search: new FormControl(''),
    rateRange: new FormControl({min: 0, max: null}),
    networkSize: new FormControl(1),
    experience: new FormControl(0),
    english: new FormControl('A1'),
    workSchedule: new FormControl(null),
    workType: new FormControl(null)
  });

  constructor(private readonly search: SearchService) {
    super();
    this.form.valueChanges.pipe(
      untilComponentDestroyed(this),
      debounceTime(500)
    ).subscribe(params => search.setParams(params));

    search.params$.pipe(
      untilComponentDestroyed(this)
    ).subscribe(params => this.form.setValue(params));
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
