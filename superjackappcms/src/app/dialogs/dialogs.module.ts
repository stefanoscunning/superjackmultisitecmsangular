import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../services';
import { ConfirmationDialogComponent } from './confirmationdialog.component';
import {ConfirmationDialogService} from './confirmationdialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [ConfirmationDialogComponent],
  providers:[
    AuthService, ConfirmationDialogService
  ],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class DialogsModule { }
