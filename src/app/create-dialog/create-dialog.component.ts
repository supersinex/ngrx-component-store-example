import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppLogicService } from '../app-logic.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private readonly _dialogRef: MatDialogRef<CreateDialogComponent>,
    private readonly _appLogic: AppLogicService
  ) { }

  public ngOnInit(): void {
    this.userForm = this._appLogic.buildUserForm();

    this.userForm.patchValue({
      first_name: '',
      last_name: '',
      email: ''
    })
  }

  public cancel(): void {
    this._dialogRef.close();
  }

  public save(): void {
    this._dialogRef.close(this.userForm.value);
  }

}
