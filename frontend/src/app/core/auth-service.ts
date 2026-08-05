import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { map, Observable, of, tap, throwError, timer } from 'rxjs';
import { Credentials, Session, SignupData, User } from '../shared/models/auth.model';

@Service()
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly session = signal<Session | null>(null);

  readonly currentUser = computed(() => this.session()?.user ?? null);
  readonly isAuthenticated = computed(() => !!this.session());

  token(): string | null {
    return this.session()?.token ?? null;
  }

  login(credentials: Credentials): Observable<User> {
    // TODO: it's just a mock
    return of({ email: credentials.email }).pipe(
      tap(user => this.session.set({ token: 'some-mock-token', user }))
    );
  }

  signup(data: SignupData): Observable<User> {
    // TODO: it's just a mock
    if (data.email === 'duplicate@test.com') {
      // mock for the duplicated case
      return throwError(() => new Error('Email already in use.'));
    }

    // mock slow request
    return timer(1000).pipe(
      map(() => ({ email: data.email })),
      tap(user => this.session.set({ token: 'some-mock-token', user }))
    );
  }

  logout(): void {
    this.session.set(null);
  }
}
