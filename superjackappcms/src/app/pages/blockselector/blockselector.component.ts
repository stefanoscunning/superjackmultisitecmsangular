import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup, FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Language, Page, PageBlock, PageSearchFilter, Site, Transfer} from '../../models';
import { environment } from '../../../environments/environment';
import {PageService, PageBlockService, SiteService} from '../../services';
import * as Lookups from '../../shared/lookups';
import {ConfirmationDialogService} from '../../dialogs/confirmationdialog.service';
import { faGlobe as fasGlobe, faEllipsisV as fasEllipsisV, faPencilAlt as fasPencilAlt, 
faSave as fasSave, faTrash as fasTrash, faClone as fasClone, 
faCheck as fasCheck, faTimes as fasTimes, faHistory as fasHistory, faProjectDiagram as fasProjectDiagram, 
faCogs as fasCogs, faPlusCircle as fasPlusCircle, faCopy as fasCopy, faCloudUploadAlt as fasCloudUploadAlt, 
faArrowCircleUp as fasArrowCircleUp, faCubes as fasCubes, faPlus as fasPlus} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-blockselector',
  templateUrl: './blockselector.component.html'
  
})
export class PageBlocksComponent implements OnInit, OnDestroy {
    installingApp: boolean = true;
    userId: number | undefined;
    encryptionKey = environment.encryption.key;
    transfer: Transfer | undefined;
    languages: Language[] = Lookups.Languages;
    

  constructor(private router: Router, private route: ActivatedRoute, 
   private pageService: PageService,
   private pageBlockService: PageBlockService,
   private siteService: SiteService,
   private bottomsheet: MatBottomSheet,
   private confirmationDialogService: ConfirmationDialogService,
   iconLibrary: FaIconLibrary 
    
    ) {
     let sessionUser = sessionStorage.getItem('currentUser');
      if(sessionUser!=null){
        let currentUser = JSON.parse(sessionUser);
          if(currentUser && currentUser.token){
            this.userId = currentUser.id;
           
        }
      }
      iconLibrary.addIcons(fasGlobe, fasEllipsisV, fasPencilAlt, fasSave, fasTrash, 
        fasClone, fasCheck, fasTimes, fasHistory, fasProjectDiagram, fasCogs, 
        fasPlusCircle, fasCopy, fasCloudUploadAlt, fasArrowCircleUp, fasCubes, fasPlus);
    }

   
    
    initBlocks(){
           
    }
    
  init(){
    if (this.userId != undefined) {
        this.initBlocks();
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
