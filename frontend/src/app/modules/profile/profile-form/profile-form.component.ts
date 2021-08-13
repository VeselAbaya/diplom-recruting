import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import { ExperienceSliderConfig } from '@shared/experience-slider.config';
import { catchError, skip, switchMap, take, tap } from 'rxjs/operators';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ProfileService } from '@modules/profile/profile.service';
import { IProfileInfoChangeEvent } from '@shared/components/profile-info/profile-info.component';
import { ErrorsService } from '@core/services/errors.service';
import { Observable, of } from 'rxjs';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { SearchService } from '@modules/search/search.service';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends OnDestroyMixin {
  readonly WorkSchedule = WorkSchedule;
  readonly WorkType = WorkType;
  readonly EnglishLevel = EnglishLevel;
  readonly ExperienceSliderConfig = ExperienceSliderConfig;
  readonly form = new FormGroup({
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    phone: new FormControl(null),
    hourlyRate: new FormControl(null),
    about: new FormControl(''),
    keywords: new FormControl([]),
    english: new FormControl(null),
    workSchedule: new FormControl(null),
    workType: new FormControl(null),
    experience: new FormControl(null),
  }, {updateOn: 'blur'});

  profileUser$: Observable<IUserDto> = this.search.selectedUser$.pipe(
    isNotNullOrUndefined(),
    tap(user => this.form.reset(user, {emitEvent: false}))
  );

  constructor(public readonly search: SearchService,
              public readonly guard: ProfileGuard,
              private readonly profile: ProfileService,
              private readonly errors: ErrorsService) {
    super();
    this.form.valueChanges.pipe(
      untilComponentDestroyed(this),
      skip(1),
      switchMap(() => this.search.selectedUser$.pipe(take(1))),
      switchMap(user => {
        const patch = this.form.value;
        patch.phone = patch.phone || null;

        if (this.form.valid) {
          return this.profile.update(this.form.value).pipe(catchError(err => {
            this.errors.handle(err);
            this.form.reset(user, {emitEvent: false});
            return of(user);
          }));
        } else {
          return of(user);
        }
      })
    ).subscribe({error: this.errors.handle});
  }

  _disabled = false;
  @Input() set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onAvatarChange(blob: Blob): void {
    this.profile.uploadAvatar(blob).subscribe();
  }

  onProfileInfoChange(change: IProfileInfoChangeEvent): void {
    const [firstName, lastName] = change.name.split(' ');
    this.form.patchValue({firstName, lastName, email: change.email, hourlyRate: change.hourlyRate});
  }
}
