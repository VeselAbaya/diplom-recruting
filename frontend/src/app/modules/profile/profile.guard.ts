import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SearchService } from '@modules/search/search.service';
import { catchError, distinctUntilChanged, map, mapTo, take, tap } from 'rxjs/operators';
import { ProfileComponent } from '@modules/profile/profile.component';
import { AuthService } from '@core/services/auth/auth.service';
import { RelationsService } from '@modules/search/relations.service';
import { ProfileService } from '@modules/profile/profile.service';
import { SearchParamsService } from '@modules/search/search-params/search-params.service';

const PROFILE_URL_REGEX = new RegExp(
  'search/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
);

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate, CanDeactivate<ProfileComponent> {
  private readonly isMyProfile = new BehaviorSubject<boolean | null>(null); // null when user not on any profile
  readonly isMyProfile$ = this.isMyProfile.pipe(distinctUntilChanged());

  constructor(private readonly search: SearchService,
              private readonly auth: AuthService,
              private readonly relations: RelationsService,
              private readonly profile: ProfileService,
              private readonly searchParams: SearchParamsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.auth.user$.pipe(
      take(1),
      map(user => user?.id === route.params.id),
    ).subscribe(isMyProfile => this.isMyProfile.next(isMyProfile));

    return this.search.getUser(route.params.id).pipe(
      tap(user => {
        this.relations.getUserRelationTypes(user.id).subscribe();
        this.profile.setSelectedUser(user);
      }),
      mapTo(true),
      catchError(() => {
        this.profile.setSelectedUser(null);
        return of(false);
      })
    );
  }

  canDeactivate(component: ProfileComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {
    const navigatingToOtherProfile = nextState && PROFILE_URL_REGEX.test(nextState?.url);
    if (!navigatingToOtherProfile) {
      this.profile.setSelectedUser(null);
      this.isMyProfile.next(null);
    }

    return true;
  }
}
