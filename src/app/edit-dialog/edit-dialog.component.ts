import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLogicService } from '../app-logic.service';
import { User } from '../types/user';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private readonly _dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private readonly _appLogic: AppLogicService
  ) { }

  public ngOnInit(): void {
    this.userForm = this._appLogic.buildUserForm();

    if (this.user) {
      this.userForm.patchValue(this.user)
    }
  }

  public cancel(): void {
    this._dialogRef.close();
  }

  public save(): void {
    this._dialogRef.close(this.userForm.value);
  }

}
