import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';
import { AuthService } from '@core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { SearchService } from '@modules/search/search.service';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  whoseNetworkLabel$ = combineLatest([
    this.guard.isMyProfile$,
    this.search.selectedUser$.pipe(isNotNullOrUndefined())
  ]).pipe(map(([isMyProfile, user]) => isMyProfile
    ? 'Your network'
    : `${user.firstName}'s network`
  ));

  constructor(public readonly auth: AuthService,
              public readonly route: ActivatedRoute,
              public readonly guard: ProfileGuard,
              private readonly search: SearchService,
              private readonly header: HeaderService) {
    header.setTitle('Profile');
  }
}
