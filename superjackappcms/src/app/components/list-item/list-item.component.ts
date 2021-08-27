import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import { faArrowsAlt as fasArrowsAlt} from '@fortawesome/free-solid-svg-icons';
  import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.html',
  styleUrls: ['./list-item.scss']
})
export class ListItemComponent {
  @Input() item!: Item;
  @Input() parentItem?: Item;
  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }
  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds.filter((id) => id !== this.item.uId);
  }
  public allDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem!.uId;
  }


  @Output() itemDrop: EventEmitter<CdkDragDrop<any>>

  constructor(iconLibrary: FaIconLibrary ) {
    this.allDropListsIds = [];
    this.itemDrop = new EventEmitter();

    iconLibrary.addIcons(fasArrowsAlt);
  }

  public onDragDrop(event: CdkDragDrop<any, any>): void {
    this.itemDrop.emit(event);
  }

}
