import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmationdialog.component';
import { Observable, of } from 'rxjs';

@Injectable()
export class ConfirmationDialogService {

    confirmationDialog: any;

  constructor(private dialog: MatDialog) { }

  
  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: string = 'sm'): Observable<any> {
      
    let resultObservable;
    const modalRef = this.dialog.open(ConfirmationDialogComponent, {disableClose: true});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    resultObservable =  new Observable<any>(s=>{
      modalRef.componentInstance.event.subscribe(data => {
        this.dialog.closeAll();
        s.next(data);    
      });
     
  });
    return resultObservable;
  }

  parseBoolean(str: string) {
    let bool = false;
    if (str.toString().toLowerCase() == "true") {
      bool = true;
    }
    return bool;
  }


}
