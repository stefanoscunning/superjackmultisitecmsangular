import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormControl} from '@angular/forms';
import {Item, Transfer} from '../../models';
import { environment } from '../../../environments/environment';
import {UserService, DynamicComponentService} from '../../services';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'trial',
  templateUrl: './trial.component.html'
})
export class TrialComponent implements OnInit {
  installingApp: boolean = true;
    userId: number | undefined;
    encryptionKey = environment.encryption.key;
    transfer: Transfer | undefined;
  
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
 
  
  
  ngOnInit(): void {
    
}
  
  
}
