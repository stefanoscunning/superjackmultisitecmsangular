import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Language, Site, Transfer } from '../models';
import { environment } from '../../environments/environment';
import { SiteService } from '../services';
import * as Lookups from '../shared/lookups';
import { ConfirmationDialogService } from '../dialogs/confirmationdialog.service';
import {
  faGlobe as fasGlobe,
  faEllipsisV as fasEllipsisV,
  faPencilAlt as fasPencilAlt,
  faSave as fasSave,
  faTrash as fasTrash,
  faClone as fasClone,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  installingApp: boolean = true;
  userId: number | undefined;
  encryptionKey = environment.encryption.key;
  transfer: Transfer | undefined;
  languages: Language[] = Lookups.Languages;
  sites: Site[] = [];
  displayedColumns: string[] = ['select', 'protocol', 'domainName', 'culture'];
  columnsToDisplay = ['protocol', 'domainName', 'culture'];
  columnDisplayNames = ['Protocol', 'Domain Name', 'Culture'];
  dataSource = new MatTableDataSource<Site>(this.sites);
  selection = new SelectionModel<Site>(false, []);
  expandedElement!: Site | null;
  protocols = ['http', 'https'];
  newElement!: Site | null;
  removalConfirmation: string[] = [
    'Delete Site?',
    'Are you sure you want to permanently delete this site?',
    'Delete',
    'Cancel',
  ];
  primarySiteRemovalConfirmation: string[] = [
    'Delete Site?',
    'You cannot delete your primary site',
    'OK',
    'Cancel',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private siteService: SiteService,
    private bottomsheet: MatBottomSheet,
    private confirmationDialogService: ConfirmationDialogService,
    iconLibrary: FaIconLibrary
  ) {
    let sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser != null) {
      let currentUser = JSON.parse(sessionUser);
      if (currentUser && currentUser.token) {
        this.userId = currentUser.id;
      }
    }
    iconLibrary.addIcons(
      fasGlobe,
      fasEllipsisV,
      fasPencilAlt,
      fasSave,
      fasTrash,
      fasClone
    );
  }

  removeElement() {
    if (
      this.expandedElement != undefined &&
      this.expandedElement.domainName == 'superjack.co.uk'
    ) {
      this.confirmationDialogService
        .confirm(
          this.primarySiteRemovalConfirmation[0],
          this.primarySiteRemovalConfirmation[1],
          this.primarySiteRemovalConfirmation[2],
          this.primarySiteRemovalConfirmation[3]
        )
        .subscribe((data) => {});
    } else {
      this.confirmationDialogService
        .confirm(
          this.removalConfirmation[0],
          this.removalConfirmation[1],
          this.removalConfirmation[2],
          this.removalConfirmation[3]
        )
        .subscribe((data) => {
          if (data.data) {
            this.deleteElement();
          }
        });
    }
  }

  goToPages() {
    if (this.expandedElement != undefined) {
      this.router.navigate(['/pages/' + this.expandedElement.id]);
    }
  }

  deleteElement() {
    if (this.expandedElement != undefined) {
      this.siteService
        .deleteByUuid(this.expandedElement.uuid)
        .subscribe((data) => {
          this.initSites();
        });
    }
  }

  addElement() {
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    // Take refernce of bottom sheet
    //    const bottomSheetRef = this.bottomsheet.open(SitesAddComponent);
    //    bottomSheetRef.instance.newItemEvent.subscribe(data=>{
    //       this.newElement = data;
    //    });
    //    // subscribe to observable that emit event when bottom sheet closes
    //    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
    //   if(this.newElement!=undefined){
    //     this.save();
    //   }
    // });
  }

  onProtocolChange(evt: any) {
    //  if(this.expandedElement!=undefined){
    //    this.expandedElement.protocol = evt.value;
    //  }
  }

  onLanguageChange(evt: any) {
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Site): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      this.sites.indexOf(row) + 1
    }`;
  }

  changeExpandedRow() {
    //console.log(this.expandedElement);
  }

  save() {
    if (this.newElement != undefined) {
      this.siteService.create(this.newElement).subscribe((data) => {
        this.initSites();
      });
    } else {
      if (this.expandedElement != undefined) {
        this.siteService.update(this.expandedElement).subscribe((data) => {
          this.initSites();
        });
      }
    }
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  initSites() {
    this.siteService.getAll().subscribe((data) => {
      this.sites = data;
    });
  }

  init() {
    if (this.userId != undefined) {
      this.initSites();
    }
  }

  ngOnInit() {
    if (this.userId != undefined) {
      this.init();
    }
  }

  ngOnDestroy(): void {}
}
