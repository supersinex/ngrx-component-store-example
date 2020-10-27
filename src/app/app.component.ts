import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AppComponentStoreService } from './store/app-component-store.service';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppComponentStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public users$ = this._store.users$;

  constructor(
    private readonly _store: AppComponentStoreService,
    private readonly _dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this._store.getUsers();
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
