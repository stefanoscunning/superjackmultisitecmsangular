import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Language, Block, Transfer, BlockField } from '../models';
import { environment } from '../../environments/environment';
import * as Lookups from '../shared/lookups';
import { faSave as fasSave, faPlus as fasPlus, faBan as fasBan} from '@fortawesome/free-solid-svg-icons';
  import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-blockfield-editor4',
  templateUrl: './blockfield-editor.component.html',

})
export class BlockFieldEditorComponent implements OnInit, OnDestroy {
  installingApp: boolean = true;
  userId: number | undefined;
  encryptionKey = environment.encryption.key;
  transfer: Transfer | undefined;
  languages: Language[] = Lookups.Languages;
  displayedColumns: string[] = ['select', 'protocol', 'domainName', 'culture'];
  columnsToDisplay = ['protocol', 'domainName', 'culture'];
  protocols = ['http', 'https'];
  @Input() blockfield: BlockField | undefined;
  @Output() newItemEvent = new EventEmitter<BlockField>();
  @Output() removeItemEvent = new EventEmitter<BlockField>();
  @Output() cancelItemEvent = new EventEmitter<BlockField>();
  myForm!: FormGroup;
  dataTypes: string[] = ['bigint', 'boolean', 'datetime', 'decimal', 'int', 'string'];


  constructor(private router: Router, private route: ActivatedRoute,
    private bottomsheet: MatBottomSheetRef<BlockFieldEditorComponent>,
    private formBuilder: FormBuilder,
    iconLibrary: FaIconLibrary 


  ) {
    let sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser != null) {
      let currentUser = JSON.parse(sessionUser);
      if (currentUser && currentUser.token) {
        this.userId = currentUser.id;

      }
    }
    iconLibrary.addIcons(fasSave, fasPlus, fasBan);
  }

  save():void {

  }

  removeBlockField(): void {
    this.removeItemEvent.emit(this.blockfield);
    this.bottomsheet.dismiss();
  }

  closeBlockFieldBottomSheet():void {
    this.newItemEvent.emit(this.blockfield);
    this.bottomsheet.dismiss();
  }

  cancelBlockField(): void{
    this.cancelItemEvent.emit(this.blockfield);
    this.bottomsheet.dismiss();
  }

 

  onTitleChange(evt: any) {
    this.isFieldValid('title');
    this.isFormValid();
  }

  onTypeChange(evt: any) {
    this.isFieldValid('dataType');
    this.isFormValid();
  }

  onValueChange(evt: any) {
    this.isFieldValid('value');
    this.isFormValid();
  }


  isFormValid() {
    let valid = false;
    let counter = 0;
    let total = 0;
    if (this.blockfield != undefined) {
      counter = Object.keys(this.blockfield).length;
      for (const [key, value] of Object.entries(this.blockfield)) {
        if (String(value).length > 0) {
          total++;
        }

      }
    }
    if(counter==total){
      valid = true;
    }

    return valid;
  }

  isFieldValid(field: string) {
    let valid = false;
    if (field != null) {
      if (this.blockfield != undefined) {
        for (const [key, value] of Object.entries(this.blockfield)) {
          if (key == field) {
            if (String(value).length > 0) {
              valid = true;
            }
          }
        }
      }

    }
    return valid;
  }

  


  ngOnInit() {
   
  }

  ngOnDestroy(): void {

  }

}

function validURL(str: string) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
   
  return !!pattern.test(str);
}