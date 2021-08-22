import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup, FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Language, Block, Transfer, BlockField} from '../models';
import { environment } from '../../environments/environment';
import {BlockService, BlockFieldService, DataTypeService} from '../services';
import * as Lookups from '../shared/lookups';
import { BlocksAddComponent } from './blocks-add.component';
import { BlockFieldEditorComponent } from './blockfield-editor.component';
import {ConfirmationDialogService} from '../dialogs/confirmationdialog.service';
import { faCubes as fasCubes, faEllipsisV as fasEllipsisV, faPencilAlt as fasPencilAlt, 
faSave as fasSave, faTrash as fasTrash, faCheck as fasCheck, faTimes as fasTimes, 
faCogs as fasCogs, faPlus as fasPlus, faCircle as fasCircle, faAngleRight as fasAngleRight, 
faBan as fasBan} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UUID } from 'angular2-uuid';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class BlocksComponent implements OnInit, OnDestroy {
    installingApp: boolean = true;
    userId: number | undefined;
    encryptionKey = environment.encryption.key;
    transfer: Transfer | undefined;
    languages: Language[] = Lookups.Languages;
    blocks: Block[] = [];
    displayedColumns: string[] = ['select', 'title', 'blockType', 'canHaveChildren', 'dateModified'];
    columnsToDisplay = ['title', 'blockType', 'canHaveChildren', 'dateModified'];
    columnDisplayNames = ['Title', 'Type', 'Sub-blocks?', 'Modified'];
    dataSource = new MatTableDataSource<Block>(this.blocks);
    selection = new SelectionModel<Block>(false, []);
    expandedElement!: Block | null;
    protocols = ['http', 'https'];
    newElement!: Block | null;
    removalConfirmation: string[] = ["Delete Block?", "Are you sure you want to permanently delete this block?", "Delete", "Cancel"];
    primaryBlockRemovalConfirmation: string[] = ["Delete Block?", "You cannot delete your primary block", "OK", "Cancel"];
    showSettings: boolean = false;
    blockFields: BlockField[] = [];
    selectedBlockField!: BlockField;
    removeBlockField: boolean = false;
    cancelBlockField: boolean = false;
    removalBlockFieldConfirmation: string[] = ["Delete Block Field?", "Are you sure you want to permanently delete this block field?", "Delete", "Cancel"];
    

  constructor(private router: Router, private route: ActivatedRoute, 
   private blockservice: BlockService,
   private blockFieldService: BlockFieldService,
   private dataTypeService: DataTypeService,
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
      iconLibrary.addIcons(fasCubes, fasEllipsisV, fasPencilAlt, fasSave, fasTrash, fasCheck, 
        fasTimes, fasCogs, fasPlus, fasCircle, fasAngleRight, fasBan);
    }

    dropBlockField(event: CdkDragDrop<any[]>) {
      moveItemInArray(this.blockFields, event.previousIndex, event.currentIndex);
      this.blockFields.forEach((item, index)=>{
        item.sortOrder = index;
        
      });
      if(this.expandedElement!=undefined){
        this.blockFieldService.updateAll(this.expandedElement.id, this.blockFields).subscribe(data=>{
          if(this.expandedElement!=undefined){
          this.initBlockFields(this.expandedElement.id)
          }
      });
       
      }
      

    }


    selectBlockField(evt: any){
      
      this.selectedBlockField = evt.option.value;
      this.openSettingsBottomSheet();
    }
    

    getPropertyType(element: any, elementColumn: string): string{
      let variable: string  = element[elementColumn];
      let dataType: string = this.dataTypeService.getDataType(variable);
      return dataType;
    }

    removeElement(){
      
      
        this.confirmationDialogService.confirm(this.removalConfirmation[0], this.removalConfirmation[1], this.removalConfirmation[2], this.removalConfirmation[3])
        .subscribe(data => {
          if(data.data){
            this.deleteElement();
          }
        });
      
      
    }

    removeBlockFieldElement(){
      
      
      this.confirmationDialogService.confirm(this.removalBlockFieldConfirmation[0], this.removalBlockFieldConfirmation[1], this.removalBlockFieldConfirmation[2], this.removalBlockFieldConfirmation[3])
      .subscribe(data => {
        if(data.data){
          this.deleteBlockField();
        }
      });
    
    
  }

    deleteElement(){
      if(this.expandedElement!=undefined){
        this.blockservice.deleteByUuid(this.expandedElement.uuid).subscribe(data=>{
          this.initBlocks();
        });
      }

    }

    deleteBlockField(){
      if(this.selectedBlockField!=undefined && this.removeBlockField){
        this.blockFieldService.deleteByUuid(this.selectedBlockField.uuid).subscribe(data=>{
          this.initBlockFields(this.selectedBlockField.blockId);
          this.removeBlockField = false;
          this.selectedBlockField = new BlockField();
        });
      }
    }

    returnToBlocks(){

    }

    goToBlockFields(){
      if(this.expandedElement!=undefined){
        this.initBlockFields(this.expandedElement.id);
       
      }
    }

    addElement(){
     this.openBottomSheet();
    }

    addSetting(){
      if(this.expandedElement!=undefined){
      this.selectedBlockField = new BlockField();
      this.selectedBlockField.id = 0;
      this.selectedBlockField.blockId = this.expandedElement.id;
      this.selectedBlockField.uuid = UUID.UUID();
      this.selectedBlockField.sortOrder = this.blockFields.length;
      this.selectedBlockField.dataType = "string";
      this.selectedBlockField.title = "";
      this.selectedBlockField.value = "";
      this.openSettingsBottomSheet();
      }
    }

    openSettingsBottomSheet(): void {
      // Take refernce of bottom sheet

         const bottomSheetRef = this.bottomsheet.open(BlockFieldEditorComponent);
         bottomSheetRef.instance.blockfield = this.selectedBlockField;
         bottomSheetRef.instance.newItemEvent.subscribe(data=>{
            this.selectedBlockField = data;
         });

         bottomSheetRef.instance.removeItemEvent.subscribe(data=>{
          this.selectedBlockField = data;
          this.removeBlockField = true;
       });

       bottomSheetRef.instance.cancelItemEvent.subscribe(data=>{
        this.selectedBlockField = data;
        this.cancelBlockField = true;
        
     });
         
         // subscribe to observable that emit event when bottom sheet closes
         bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
        if(this.selectedBlockField!=undefined){
          if(!this.removeBlockField && !this.cancelBlockField){
            this.saveBlockField();          
          }
          else if(!this.removeBlockField && this.cancelBlockField){
            this.initBlockFields(this.selectedBlockField.blockId);
          }
          else if(this.removeBlockField && !this.cancelBlockField){
            this.removeBlockFieldElement();
          }
          else{
            this.initBlockFields(this.selectedBlockField.blockId);
          }          
        }
       
      });
      }

    saveBlockField():void{
      if(this.selectedBlockField!=undefined && this.selectedBlockField.id==0){
        this.blockFieldService.create(this.selectedBlockField).subscribe(data=>{
          this.initBlockFields(this.selectedBlockField.blockId);
        });
      }
      else{
        if(this.selectedBlockField!=undefined && this.selectedBlockField.id>0){
          this.blockFieldService.update(this.selectedBlockField).subscribe(data=>{
            this.initBlockFields(this.selectedBlockField.blockId);
          });
        }
        
      }
    }

    openBottomSheet(): void {
      // Take refernce of bottom sheet

         const bottomSheetRef = this.bottomsheet.open(BlocksAddComponent);
         bottomSheetRef.instance.newItemEvent.subscribe(data=>{
            this.newElement = data;
         });
         
         // subscribe to observable that emit event when bottom sheet closes
         bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
        if(this.newElement!=undefined){
          this.save();
        }
       
      });
      }

    onProtocolChange(evt: any){
    //  if(this.expandedElement!=undefined){
    //    this.expandedElement.protocol = evt.value;
    //  }
    }

    onLanguageChange(evt: any){
      // if(this.expandedElement!=undefined){
      //   this.expandedElement.culture = evt.value;
      // }
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
  checkboxLabel(row?: Block): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.blocks.indexOf(row) + 1}`;
  }

  changeExpandedRow(){
    if(this.expandedElement!=undefined){
      this.initBlockFields(this.expandedElement.id);
    }
    //console.log(this.expandedElement);
  }

  save(){

    if(this.newElement!=undefined){
      this.blockservice.create(this.newElement).subscribe(data=>{
        this.initBlocks();
      });
    }
    else{
      if(this.expandedElement!=undefined){
        this.blockservice.update(this.expandedElement).subscribe(data=>{
          this.initBlocks();
        });
      }
      
    }
  }


    goTo(path: string){
      this.router.navigate([path]);
    }

    initBlockFields(blockId: number){
      this.blockFieldService.getAllByBlockId(blockId).subscribe(data=>{
        this.blockFields = data;
        this.cancelBlockField = false;
        this.removeBlockField = false;
        
      });
    }

    initBlocks(){
      this.blockservice.getAll().subscribe(data=>{
        this.blocks = data;
      });
      
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

function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
