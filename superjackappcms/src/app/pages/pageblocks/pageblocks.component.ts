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
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-page-blocks',
  templateUrl: './pageblocks.component.html'
  
})
export class PageBlocksComponent implements OnInit, OnDestroy {
    @Input() selectedPage: Page | null;
    installingApp: boolean = true;
    userId: number | undefined;
    encryptionKey = environment.encryption.key;
    transfer: Transfer | undefined;
    languages: Language[] = Lookups.Languages;
    site!: Site | null;
    pageblocks: PageBlock[] = [];
    title!: string | null;
    selectedPageBlock!: PageBlock | null;
    

  constructor(private router: Router, private route: ActivatedRoute, 
   private pageService: PageService,
   private pageBlockService: PageBlockService,
   private siteService: SiteService,
   private bottomsheet: MatBottomSheet,
   private confirmationDialogService: ConfirmationDialogService,
   iconLibrary: FaIconLibrary 
    
    ) {
        this.selectedPage = new Page();
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

   
    goUpLevel(){
      
      
    }

    addBlock(){

    }

    dropPageBlock(event: CdkDragDrop<any[]>) {
      moveItemInArray(this.pageblocks, event.previousIndex, event.currentIndex);
      this.pageblocks.forEach((item, index)=>{
        item.sortOrder = index;
      });      
    }

    showChildBlocks(p: PageBlock){
      this.selectedPageBlock = p;
      this.loadPageBlocks(p.pageId, p.id, p.level + 1);
    }

    showBlockFields(p: PageBlock){

    }

    loadPageBlocks(pageid: number, pageblockid: number, level: number){
      this.pageBlockService.getAllByPageIdParentIdLevel(pageid, pageblockid, level).subscribe(data=>{
        this.pageblocks = data;
        this.title = "Page Blocks";
      });
    }
    
    initPageBlocks(){
        if(this.selectedPage!=null){
            this.pageBlockService.getAllByPageId(this.selectedPage.id).subscribe(data=>{
                this.pageblocks = data;
                this.title = "Page Blocks for " + this.selectedPage?.navigationTitle;
            });
        }
    }
    
  init(){
    if (this.userId != undefined) {
        this.initPageBlocks();
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
