import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../types/user';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {

  @Input() public user: User;
  @Output() public userDeleted = new EventEmitter();
  @Output() public openEdit = new EventEmitter();

  constructor() { }

  public delete(): void {
    this.userDeleted.emit();
  }

  public edit(): void {
    this.openEdit.emit();
  }

}
