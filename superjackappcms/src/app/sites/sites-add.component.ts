import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Language, Site, Transfer } from '../models';
import { environment } from '../../environments/environment';
import * as Lookups from '../shared/lookups';

@Component({
  selector: 'app-sites-add',
  templateUrl: './sites-add.component.html',

})
export class SitesAddComponent implements OnInit, OnDestroy {
  installingApp: boolean = true;
  userId: number | undefined;
  encryptionKey = environment.encryption.key;
  transfer: Transfer | undefined;
  languages: Language[] = Lookups.Languages;
  displayedColumns: string[] = ['select', 'protocol', 'domainName', 'culture'];
  columnsToDisplay = ['protocol', 'domainName', 'culture'];
  protocols = ['http', 'https'];
  site: Site | undefined;
  @Output() newItemEvent = new EventEmitter<Site>();
  myForm!: FormGroup;


  constructor(private router: Router, private route: ActivatedRoute,
    private bottomsheet: MatBottomSheetRef<SitesAddComponent>,
    private formBuilder: FormBuilder


  ) {
    let sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser != null) {
      let currentUser = JSON.parse(sessionUser);
      if (currentUser && currentUser.token) {
        this.userId = currentUser.id;

      }
    }
  }

  save() {

  }

  closeBottomSheet() {
    this.newItemEvent.emit(this.site);
    this.bottomsheet.dismiss();
  }

  onProtocolChange(evt: any) {
    if(this.site!=undefined){
      this.site.protocol = evt.value;
    }
    

  }

  onLanguageChange(evt: any) {
    if(this.site!=undefined){
      this.site.culture = evt.value;
    }
  }

  onDomainNameChange(evt: any) {
    this.isFieldValid('domainName');
    this.isValidDomainUrl('domainName');
    this.isFormValid();
  }

  isValidDomainUrl(field: string){
    let valid = false;
    if (field != null) {
      if (this.site != undefined) {
        for (const [key, value] of Object.entries(this.site)) {
          if (key == field) {
            if (validURL(String(value))) {
              valid = true;
            }
          }
        }
      }
    }
    return valid;
  }

  isFormValid() {
    let valid = false;
    let counter = 0;
    let total = 0;
    if (this.site != undefined) {
      counter = Object.keys(this.site).length;
      for (const [key, value] of Object.entries(this.site)) {
        if (String(value).length > 0) {
          total++;
        }

      }
    }
    if(counter==total && this.isValidDomainUrl('domainName')){
      valid = true;
    }

    return valid;
  }

  isFieldValid(field: string) {
    let valid = false;
    if (field != null) {
      if (this.site != undefined) {
        for (const [key, value] of Object.entries(this.site)) {
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
    this.site = new Site();
    this.site.id = 0;
    this.site.culture = "en-GB";
    this.site.protocol = "https";
    this.site.domainName = "";
    // this.myForm = this.formBuilder.group({
    //     domainName: new FormControl(null, Validators.required)

    //   });
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