import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormControl} from '@angular/forms';
import {Item, Transfer} from '../../models';
import { environment } from '../../../environments/environment';
import {UserService, DynamicComponentService} from '../../services';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'page-editor',
  templateUrl: './page-editor.html',
  styleUrls: ['./page-editor.scss']
})
export class PageEditorComponent implements OnInit {
  public parentItem: Item;
  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.getIdsRecursive(this.parentItem).reverse();
  } 
  installingApp: boolean = true;
    userId: number | undefined;
    encryptionKey = environment.encryption.key;
    transfer: Transfer | undefined;
  
  constructor(private router: Router, private route: ActivatedRoute, 
    private userService: UserService, private dynamicComponentService: DynamicComponentService
     
     ) { 
       this.parentItem = new Item({ name: 'parent-item' });
       let sessionUser = sessionStorage.getItem('currentUser');
       if(sessionUser!=null){
         let currentUser = JSON.parse(sessionUser);
           if(currentUser && currentUser.token){
             this.userId = currentUser.id;
            
         }
       }
     }
 
  
  
  ngOnInit(): void {
     this.parentItem.children.push(new Item({
    name: 'test1',
    children: [
      new Item({ name: 'subItem1' }),
      new Item({ name: 'subItem2' }),
      new Item({ name: 'subItem3' })
    ]
  }));
  this.parentItem.children.push(new Item({
    name: 'test2',
    children: [
      new Item({ name: 'subItem4' }),
      new Item({ name: 'subItem5' }),
      new Item({
        name: 'subItem6', children: [
          new Item({ name: 'subItem8' })
        ]
      })
    ]
  }));
  this.parentItem.children.push(new Item({ name: 'test3' }));


  }
  

  public onDragDrop(event: CdkDragDrop<any>) {
    event.container.element.nativeElement.classList.remove('active');
    if (this.canBeDropped(event)) {
      const movingItem: Item = event.item.data;
      event.container.data.children.push(movingItem);
      event.previousContainer.data.children = event.previousContainer.data.children.filter((child: { uId: string; }) => child.uId !== movingItem.uId);
    } else {
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  
  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem) => { ids = ids.concat(this.getIdsRecursive(childItem)) });
    return ids;
  }
  
  private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
    const movingItem: Item = event.item.data;
  
    return event.previousContainer.id !== event.container.id
      && this.isNotSelfDrop(event)
      && !this.hasChild(movingItem, event.container.data);
  }
  
  private isNotSelfDrop(event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }
  
  private hasChild(parentItem: Item, childItem: Item): boolean {
    const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
    return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
  }
  
}
