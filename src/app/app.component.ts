import { trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeInOut } from './animations/fade-in-out';
import { fadeOut } from './animations/fade-out';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AppComponentStoreService } from './store/app-component-store.service';
import { SortDirectionOption } from './types/sort-direction-option';
import { SortPropertyOption } from './types/sort-property-option';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppComponentStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', fadeInOut),
    trigger('fadeOut', fadeOut)
  ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // Filter Form Controls
  public searchTerm: FormControl = new FormControl();
  public sortProperty: FormControl = new FormControl('first_name');
  public sortDirection: FormControl = new FormControl(1);
  public sortProperties: SortPropertyOption[] = [
    {
      name: 'First Name',
      value: 'first_name'
    },
    {
      name: 'Last Name',
      value: 'last_name'
    },
    {
      name: 'Email',
      value: 'email'
    }
  ];
  public sortDirections: SortDirectionOption[] = [
    {
      name: 'Ascending',
      value: 1
    },
    {
      name: 'Descending',
      value: 2
    },
  ]

  // Observables
  public readonly users$ = this._store.users$;
  public readonly _onDestroy$ = new Subject();

  constructor(
    private readonly _store: AppComponentStoreService,
    private readonly _dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this._store.getUsers();
  }

  public ngAfterViewInit(): void {
    this.searchTerm.valueChanges
    .pipe(takeUntil(this._onDestroy$))
    .subscribe((searchTerm: string) => {
      this._store.setSearchTerm(searchTerm);
    });

    this.sortProperty.valueChanges
    .pipe(takeUntil(this._onDestroy$))
    .subscribe((sortProperty: string) => {
      this._store.setSortProperty(sortProperty);
    });

    this.sortDirection.valueChanges
    .pipe(takeUntil(this._onDestroy$))
    .subscribe((sortDirection: number) => {
      this._store.setSortDirection(sortDirection);
    });
  }

  public ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  public clearSearch(): void {
    this.searchTerm.patchValue('');
  }

  public add(): void {
    const dialogRef = this._dialog.open(CreateDialogComponent);

    dialogRef.afterClosed().subscribe((newUser: User) => {
      if (newUser) {
        this._store.addUser(newUser);
      }
    });
  }

  public editUser(user: User): void {
    const config: MatDialogConfig = {
      data: user,
    };
    const dialogRef = this._dialog.open(EditDialogComponent, config);

    dialogRef.afterClosed().subscribe((editedUser: User) => {
      if (editedUser) {
        this._store.editUser(editedUser);
      }
    });
  }

  public deleteUser(user: User): void {
    const config: MatDialogConfig = {
      autoFocus: false,
      data: `${user.first_name} ${user.last_name}`,
    };

    const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._store.deleteUser(user.id);
      }

      return;
    });
  }
}
