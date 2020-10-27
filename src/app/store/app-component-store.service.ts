import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { User } from '../types/user';
import { v4 as uuidv4 } from 'uuid';

export interface AppComponentState {
  users: User[];
  sortProperty: string;
  searchTerm: string;
  sortDirection: number;
}

const DEFAULT_STATE: AppComponentState = {
  users: [],
  sortProperty: 'first_name',
  searchTerm: null,
  sortDirection: 1
};

@Injectable()
export class AppComponentStoreService extends ComponentStore<AppComponentState> {
  constructor(private readonly _http: HttpClient) {
    // Since it extends the ComponentStore, we have to call super, and it accepts the default state
    // as a parameter.
    super(DEFAULT_STATE);
  }

  /* Selectors */
  readonly users$: Observable<User[]> = this.select((state) => {
    let users = [...state.users];
    if (state.searchTerm) {
      users = users.filter((user) =>
        user.email.toLowerCase().includes(state.searchTerm) || user.first_name.toLowerCase().includes(state.searchTerm) || user.last_name.toLowerCase().includes(state.searchTerm)
      );
    }

    return users.sort((firstUser, secondUser) => {
      if (firstUser[state.sortProperty] < secondUser[state.sortProperty])
        return state.sortDirection === 1 ? -1 : 1;
      if (firstUser[state.sortProperty] > secondUser[state.sortProperty])
      return state.sortDirection === 1 ? 1 : -1;
      return 0;
    });
  });

  /* Updaters */
  readonly setUsers = this.updater((state, users: User[]) => ({
    ...state,
    users: users,
  }));

  readonly setSearchTerm = this.updater((state, searchTerm: string) => ({
    ...state,
    searchTerm: searchTerm
  }));

  readonly setSortProperty = this.updater((state, sortProperty: string) => ({
    ...state,
    sortProperty: sortProperty
  }));

  readonly setSortDirection = this.updater((state, sortDirection: number) => ({
    ...state,
    sortDirection: sortDirection
  }));

  readonly addUser = this.updater((state, user: User) => {
    const users = [...state.users];
    users.push(user);

    return {
      ...state,
      users: users,
    };
  });

  readonly editUser = this.updater((state, user: User) => {
    const users = [...state.users];
    const userIndex = state.users.findIndex((x) => x.id === user.id);

    users[userIndex] = user;

    return ({
      ...state,
      users: users
    })
  })

  readonly deleteUser = this.updater((state, userId: string) => {
    const users = [...state.users];
    const userIndex = state.users.findIndex((x) => x.id === userId);
    if (userIndex > -1) {
      users.splice(userIndex, 1);
    }
    return {
      ...state,
      users: users,
    };
  });

  /* Effects */
  readonly getUsers = this.effect((input$: Observable<void>) =>
    input$.pipe(
      switchMap(() =>
        this._http.get('https://reqres.in/api/users?page=2').pipe(
          tap({
            next: (payload: any) =>
              this.setUsers(
                payload.data.map((x: User) => {
                  return {
                    ...x,
                    id: uuidv4(),
                    avatarNumber: Math.floor(Math.random() * Math.floor(9))
                  };
                })
              ),
            error: (e) => console.log(e),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
