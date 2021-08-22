import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Language, Block, Transfer } from '../models';
import { environment } from '../../environments/environment';
import * as Lookups from '../shared/lookups';
import { faSave as fasSave, faPlus as fasPlus} from '@fortawesome/free-solid-svg-icons';
  import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-blocks-add',
  templateUrl: './blocks-add.component.html',

})
export class BlocksAddComponent implements OnInit, OnDestroy {
  installingApp: boolean = true;
  userId: number | undefined;
  encryptionKey = environment.encryption.key;
  transfer: Transfer | undefined;
  languages: Language[] = Lookups.Languages;
  displayedColumns: string[] = ['select', 'protocol', 'domainName', 'culture'];
  columnsToDisplay = ['protocol', 'domainName', 'culture'];
  protocols = ['http', 'https'];
  block: Block | undefined;
  @Output() newItemEvent = new EventEmitter<Block>();
  myForm!: FormGroup;


  constructor(private router: Router, private route: ActivatedRoute,
    private bottomsheet: MatBottomSheetRef<BlocksAddComponent>,
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
    iconLibrary.addIcons(fasSave, fasPlus);
  }

  save():void {

  }

  closeBottomSheet():void {
    this.newItemEvent.emit(this.block);
    this.bottomsheet.dismiss();
  }

 

  onTitleChange(evt: any) {
    this.isFieldValid('title');
    this.isFormValid();
  }

  onTypeChange(evt: any) {
    this.isFieldValid('blockType');
    this.isFormValid();
  }


  isFormValid() {
    let valid = false;
    let counter = 0;
    let total = 0;
    if (this.block != undefined) {
      counter = Object.keys(this.block).length;
      for (const [key, value] of Object.entries(this.block)) {
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
      if (this.block != undefined) {
        for (const [key, value] of Object.entries(this.block)) {
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
    this.block = new Block();
    this.block.id = 0;
    this.block.uuid = UUID.UUID();
    this.block.parentId = 0;
    this.block.canHaveChildren = false;
    this.block.dateCreated = new Date();
    this.block.dateModified = new Date();
    this.block.blockType = "";
    this.block.title = "";
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