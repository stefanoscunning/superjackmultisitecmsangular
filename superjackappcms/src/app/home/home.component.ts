import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormControl} from '@angular/forms';
import {Item, Transfer} from '../models';
import { environment } from '../../environments/environment';
import {UserService, DynamicComponentService} from '../services';

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
    dynamicComponents: any[] = [];
    pComponents: any[] = [
      {
        id: 2,
        codeReference: 'trial'
      },
      {
        id: 1,
        codeReference: 'page-editor'
      }
      
    ]
    

  constructor(private router: Router, private route: ActivatedRoute, 
   private userService: UserService, private dynamicComponentService: DynamicComponentService
    
    ) { 
      let sessionUser = sessionStorage.getItem('currentUser');
      if(sessionUser!=null){
        let currentUser = JSON.parse(sessionUser);
          if(currentUser && currentUser.token){
            this.userId = currentUser.id;
           
        }
      }
     


       
      
    }

    loadDynamicComponents(sComponents: any[]) {
      setTimeout(() => {
        this.dynamicComponents = this.dynamicComponentService.loadComponents(sComponents);
      }, 500);    
      
  
    }
  

    goTo(path: string){
      this.router.navigate([path]);
    }

    initUsers(){

      this.userService.getAll().subscribe(data=>{
       
      });
    }

    
  init(){
    if (this.userId != undefined) {
     this.initUsers();
    }
  }

 
ngOnInit() {
  this.loadDynamicComponents(this.pComponents);
  
  if(this.userId!=undefined){
    this.init();
  }
}

ngOnDestroy(): void {

}

}
