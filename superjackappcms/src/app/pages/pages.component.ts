import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup, FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Language, Page, PageSearchFilter, Site, Transfer} from '../models';
import { environment } from '../../environments/environment';
import {PageService, SiteService} from '../services';
import * as Lookups from '../shared/lookups';
import {ConfirmationDialogService} from '../dialogs/confirmationdialog.service';
import { faGlobe as fasGlobe, faEllipsisV as fasEllipsisV, faPencilAlt as fasPencilAlt, 
faSave as fasSave, faTrash as fasTrash, faClone as fasClone, 
faCheck as fasCheck, faTimes as fasTimes, faHistory as fasHistory, faProjectDiagram as fasProjectDiagram, 
faCogs as fasCogs, faPlusCircle as fasPlusCircle, faCopy as fasCopy, faCloudUploadAlt as fasCloudUploadAlt, 
faArrowCircleUp as fasArrowCircleUp} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PagesComponent implements OnInit, OnDestroy {
    installingApp: boolean = true;
    userId: number | undefined;
    encryptionKey = environment.encryption.key;
    transfer: Transfer | undefined;
    languages: Language[] = Lookups.Languages;
    site!: Site | null;
    pages: Page[] = [];
    displayedColumns: string[] = ['navigationTitle', 'pageTypeId', 'route', 'level', 'dateScheduledPublish'];
    columnsToDisplay = ['navigationTitle', 'pageTypeId', 'route', 'level', 'dateScheduledPublish'];
    columnDisplayNames = ['Navigation Title', 'Template', 'Route', 'Level', 'Publish Scheduled Date'];
    dataSource = new MatTableDataSource<Page>(this.pages);
    selection = new SelectionModel<Page>(false, []);
    expandedElement!: Page | null;
    protocols = ['http', 'https'];
    newElement!: Page | null;
    removalConfirmation: string[] = ["Delete Page?", "Are you sure you want to permanently delete this page?", "Delete", "Cancel"];
    primaryPageRemovalConfirmation: string[] = ["Delete Page?", "You cannot delete your primary page", "OK", "Cancel"];
    siteId!: number;
    visiblePages!: Page[] | null;
    title!: string | null;
    parentPage!: Page | null;
    showVersions: boolean = false;
    

  constructor(private router: Router, private route: ActivatedRoute, 
   private pageService: PageService,
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
        fasPlusCircle, fasCopy, fasCloudUploadAlt, fasArrowCircleUp);
    }

    goUpLevel(){
      if(this.parentPage!=null ){
        if(this.parentPage.level==0){
          this.parentPage = null;
          this.title = `Root pages for ${this.site?.domainName}`;
          this.visiblePages = this.pages.filter(x=>x.level==0);
        }
        else{
            const identifier = this.parentPage.parentPageIdentifier;
            if(this.pages!=null){
              this.parentPage = this.pages.filter(x=>x.pageIdentifier==identifier)[0];
              this.title = `Child pages for ${this.parentPage.navigationTitle}`;
              this.visiblePages = this.parentPage.children;
            }
        }
      }
      
    }

    showChildPages(p: Page){
      this.parentPage = p;
      this.title = `Child pages for ${this.parentPage.navigationTitle}`;
      this.visiblePages = p.children;
      
    }

    showVersionPages(p: Page){
      this.parentPage = p;
      this.title = `Version history for ${this.parentPage.navigationTitle}`;
      this.visiblePages = p.versions;
    }

    addPage(){

    }

    removeElement(){
      
      
        this.confirmationDialogService.confirm(this.removalConfirmation[0], this.removalConfirmation[1], this.removalConfirmation[2], this.removalConfirmation[3])
        .subscribe(data => {
          if(data.data){
            this.deleteElement();
          }
        });
    
      
    }

    goToPages(){
      if(this.expandedElement!=undefined){
        
      }
    }

    deleteElement(){
      if(this.expandedElement!=undefined){
       
      }

    }

    addElement(){
    
    }

   

    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Page): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.pages.indexOf(row) + 1}`;
  }

  changeExpandedRow(){
    //console.log(this.expandedElement);
  }

  save(){

    if(this.newElement!=undefined){
      this.pageService.create(this.newElement).subscribe(data=>{
        this.initPages();
      });
    }
    else{
      if(this.expandedElement!=undefined){
        this.pageService.update(this.expandedElement).subscribe(data=>{
          this.initPages();
        });
      }
      
    }
  }


    goTo(path: string){
      this.router.navigate([path]);
    }

    initPages(){
      if(this.siteId!=undefined){        
        this.pageService.getTreeBySiteId(this.siteId).subscribe(data=>{
          this.pages = data;
          this.visiblePages = this.pages.filter(x=>x.level==0);
        });
      }
      
      
    }


    initSite(){
      this.route.params.subscribe(param =>{
      
        let s = this.route.snapshot.paramMap.get('siteid');
        if(s!=undefined){
          this.siteId = parseInt(s);
          this.siteService.getById(this.siteId).subscribe(data=>{
            this.site = data;
            this.title = `Root pages for ${this.site.domainName}`;
            this.initPages();
          });
          
        }
      });
     
    }

    
  init(){
    if (this.userId != undefined) {
     this.initSite();
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
