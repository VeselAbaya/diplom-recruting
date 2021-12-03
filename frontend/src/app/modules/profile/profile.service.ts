import { Injectable } from '@angular/core';
import { IPatchUserDto } from '@monorepo/types/user/patch-user.dto.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { HttpClient } from '@angular/common/http';
import { Path } from '@monorepo/routes';
import { AuthService } from '@core/services/auth/auth.service';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly selectedUser = new BehaviorSubject<IUserDto | null>(null);
  readonly selectedUser$ = this.selectedUser.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient, private readonly auth: AuthService) {
  }

  update(patchUserDto: IPatchUserDto): Observable<IUserDto> {
    return this.http.patch<IUserDto>(Path.users.me(), patchUserDto).pipe(
      tap(user => this.auth._currentUser.next(user))
    );
  }

  uploadAvatar(blob: Blob): Observable<unknown> {
    const formData = new FormData();
    formData.append('blob', blob);
    return this.http.post(Path.users.avatar(), formData);
  }

  setSelectedUser(user: IUserDto | null): void {
    this.selectedUser.next(user);
  }
}
