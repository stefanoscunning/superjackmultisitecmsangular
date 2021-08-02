import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {User} from './models';
import {AuthService, UserService} from './services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Superjack Apps CMS';
  currentUser: any;
    userId: number | undefined;
   
    

  constructor(private authService: AuthService,
    private userService: UserService
    ){

      let sessionUser = sessionStorage.getItem('currentUser');
      if(sessionUser !=null)
      {

        this.currentUser = JSON.parse(sessionUser);
          if(this.currentUser && this.currentUser.token){
            this.userId = this.currentUser.id;
            
        }
      }
      

  }

  init(){
   
  }


  ngOnInit() {

    if(this.userId!=null){
      this.init();
    }
    
     
  }

  

}
