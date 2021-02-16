import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import { ExperienceSliderConfig } from '@shared/experience-slider.config';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent {
  readonly WorkSchedule = WorkSchedule;
  readonly WorkType = WorkType;
  readonly EnglishLevel = EnglishLevel;
  readonly ExperienceSliderConfig = ExperienceSliderConfig;

  _disabled = false;
  @Input() set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  };
  name: string | null = null;
  readonly form = new FormGroup({
    keywords: new FormControl([]),
    english: new FormControl(),
    workSchedule: new FormControl(),
    workType: new FormControl(),
    experience: new FormControl(),
  });

  constructor(private readonly cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.name = 'Antay Juskovets';
      cdr.markForCheck();
    }, 1200);

    this.form.valueChanges.subscribe(console.log);
  }

  onAvatarChange(blob: Blob): void {
    console.log(blob);
  }
}
