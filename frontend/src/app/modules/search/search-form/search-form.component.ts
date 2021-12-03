import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {
  EnglishLevel,
  ISearchParamsDto,
  WorkSchedule,
  WorkType
} from '@monorepo/types/search/search-params.dto.interface';
import { map } from 'rxjs/operators';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { RelationsService } from '@modules/search/relations.service';
import { ProfileService } from '@modules/profile/profile.service';
import { ISearchParams } from '@modules/search/search-params/search-params.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SearchFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SearchFormComponent
    }
  ]
})
export class SearchFormComponent extends OnDestroyMixin implements ControlValueAccessor, Validator {
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

  private onChange: (val: ISearchParams) => unknown = v => {};
  onTouch = () => {};

  constructor(public readonly profile: ProfileService,
              public readonly relations: RelationsService) {
    super();
    this.reset();

    this.form.valueChanges.pipe(
      untilComponentDestroyed(this),
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
    ).subscribe(val => this.onChange(val));
  }

  registerOnChange(fn: (val: ISearchParams) => unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  writeValue(val: ISearchParams | null): void {
    if (val) {
      this.form.setValue({
        search: val.search,
        rateRange: {min: val.hourlyRateMin, max: val.hourlyRateMax},
        networkSize: val.networkSize,
        relationTypes: val.relationTypes,
        experience: val.experience,
        english: val.english,
        workSchedule: val.workSchedule,
        workType: val.workType
      });
    } else {
      this.reset();
    }
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

  validate(): ValidationErrors | null {
    return Object.values(this.form.controls).reduce((errors, control) => {
      if (control.invalid) {
        errors = errors ? {...errors, ...control.errors} : control.errors;
      }
      return errors;
    }, null as ValidationErrors | null);
  }
}
