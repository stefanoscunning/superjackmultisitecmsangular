import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {Md5} from 'ts-md5/dist/md5';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers:[AuthService, UserService]
})
export class LoginModule { }
