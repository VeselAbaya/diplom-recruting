import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SearchService } from '@modules/search/search.service';
import { catchError, distinctUntilChanged, map, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { ProfileComponent } from '@modules/profile/profile.component';
import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate, CanDeactivate<ProfileComponent> {
  private readonly isMyProfile = new BehaviorSubject<boolean>(false);
  readonly isMyProfile$ = this.isMyProfile.pipe(distinctUntilChanged());

  constructor(private readonly search: SearchService, private readonly auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.auth.user$.pipe(
      take(1),
      map(user => user?.id === route.params.id),
    ).subscribe(isMyProfile => this.isMyProfile.next(isMyProfile));

    return this.search.getUserAndSetAsSelected(route.params.id).pipe(
      mapTo(true),
      catchError(() => of(false))
    );
  }

  canDeactivate(): Observable<boolean> {
    return this.search.params$.pipe(
      take(1),
      tap(params => {
        this.search.setParams({...params, fromUserId: undefined});
        this.search.setSelectedUser(null);
        this.isMyProfile.next(false);
      }),
      mapTo(true)
    );
  }
}
