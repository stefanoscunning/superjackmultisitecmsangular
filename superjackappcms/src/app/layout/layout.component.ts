import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services';
import { ROUTES } from '../shared/sidebar/sidebar-routes.config';
import { RouteInfo } from "../shared/sidebar/sidebar.metadata";
import { faBars as fasBars, faGlobe as fasGlobe, faHome as fasHome, faShapes as fasShapes, 
  faCubes as fasCubes, faSignOutAlt as fasSignOutAlt, faUsers as fasUsers } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public menuItems: any[] | undefined;
  currentUser: any;
 

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
    private authService: AuthService, iconLibrary: FaIconLibrary) { 
      let sessionUser = sessionStorage.getItem('currentUser');
      if(sessionUser!=null){
        this.currentUser = JSON.parse(sessionUser);
      }
      
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
 
    iconLibrary.addIcons(fasBars, fasGlobe, fasHome, fasShapes, fasCubes, fasSignOutAlt, fasUsers);

  }

  signOut(){
    this.authService.logout();
    window.location.href = '/';
  }


  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
