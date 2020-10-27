import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserCardComponent } from './user-card/user-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppLogicService } from './app-logic.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AppLogicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
