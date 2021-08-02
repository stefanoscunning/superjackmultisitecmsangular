import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormControl} from '@angular/forms';
import {Transfer} from '../models';
import { environment } from '../../environments/environment';
import {UserService} from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    installingApp: boolean = true;
    userId: number | undefined;
    encryptionKey = environment.encryption.key;
    transfer: Transfer | undefined;
    

  constructor(private router: Router, private route: ActivatedRoute, 
   private userService: UserService
    
    ) { 
      let sessionUser = sessionStorage.getItem('currentUser');
      if(sessionUser!=null){
        let currentUser = JSON.parse(sessionUser);
          if(currentUser && currentUser.token){
            this.userId = currentUser.id;
           
        }
      }
     


       
      
    }

    goTo(path: string){
      this.router.navigate([path]);
    }

    initUsers(){

      this.userService.getAll().subscribe(data=>{
        console.log(data);
      });
    }

    
  init(){
    if (this.userId != undefined) {
     this.initUsers();
    }
  }

 
ngOnInit() {
  if(this.userId!=undefined){
    this.init();
  }
}

ngOnDestroy(): void {

}

}
