import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';
import { AuthService } from '@core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { SearchService } from '@modules/search/search.service';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined/is-not-null-or-undefined';
import { FullNamePipe } from '@shared/pipes/full-name/full-name.pipe';
import { ProfileService } from '@modules/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  whoseNetworkLabel$ = combineLatest([
    this.guard.isMyProfile$,
    this.profile.selectedUser$.pipe(isNotNullOrUndefined())
  ]).pipe(map(([isMyProfile, user]) => isMyProfile
    ? 'Your network'
    : `${user.firstName}'s network`
  ));

  constructor(public readonly route: ActivatedRoute,
              public readonly guard: ProfileGuard,
              private readonly search: SearchService,
              private readonly header: HeaderService,
              private readonly auth: AuthService,
              private readonly fullName: FullNamePipe,
              private readonly profile: ProfileService) {
    this.guard.isMyProfile$.pipe(
      switchMap(isMyProfile => isMyProfile ? this.auth.user$ : this.profile.selectedUser$),
      isNotNullOrUndefined(),
      map(user => fullName.transform(user)),
      take(1)
    ).subscribe(userFullName => header.setTitle(`Profile | ${userFullName}`));
  }
}
