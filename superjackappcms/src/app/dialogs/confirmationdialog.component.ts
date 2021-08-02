import { Component, Input, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'confirmationdialog',
  templateUrl: './confirmationdialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() btnOkText: string | undefined;
  @Input() btnCancelText: string | undefined;
  accepted: boolean = false;
  results: any;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  triggerEvent() {
    this.event.emit({data: this.accepted});
  }

  public decline() {
     this.accepted = false;
     this.triggerEvent();
    
  }

  public accept() {
    this.accepted = true;
    this.triggerEvent();
  }

  public dismiss() {
    this.accepted = false;
    this.triggerEvent();
  }

  public getStatus(){
    return Promise.resolve(this.accepted);
  }

}
