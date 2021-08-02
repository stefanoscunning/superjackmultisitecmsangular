import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] | undefined;
  menuClassName = "red darken-1";
  currentUser: any;
 
  constructor(private router: Router,
      private route: ActivatedRoute) {
        let sessionUser = sessionStorage.getItem('currentUser');
        if(sessionUser!=null){
          this.currentUser = JSON.parse(sessionUser);
        }
        
          
  }

  ngOnInit() {
    
    
      this.menuItems = ROUTES.filter(menuItem => menuItem);
   
  }

}
