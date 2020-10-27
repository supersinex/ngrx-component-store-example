import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppLogicService {

  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  public buildUserForm(): FormGroup {
    return this._formBuilder.group({
      id: new FormControl(uuidv4()),
      first_name: [new FormControl(), [Validators.required, Validators.maxLength(15)]],
      last_name: [new FormControl(), [Validators.required, Validators.maxLength(15)]],
      email: [new FormControl(), [Validators.required, Validators.email, Validators.maxLength(50)]],
      avatarNumber: new FormControl(Math.floor(Math.random() * Math.floor(9)))
    });
  }
}
