import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {Site} from '../models';
import { SuperjackService } from './superjack.service';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { PageEditorComponent } from '../components/page-editor/page-editor.component';
import { DynamicComponentItem } from '../dynamic/dynamiccomponent-item';
import {TrialComponent} from '../components/trial/trial.component';

@Injectable({providedIn: 'root'})
export class DynamicComponentService {
    
    httpHeaders: HttpHeaders | undefined;
    token: string | undefined;
    constructor(private router: Router, private http: HttpClient, private argo: SuperjackService) {
       let sessionUser = sessionStorage.getItem('currentUser');
       if(sessionUser!=null){
        let currentUser = JSON.parse(sessionUser);
        if(currentUser && currentUser.token){
            this.token = currentUser.token;
            this.httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
              });
        }
       }
        
            
     }

     loadComponents(components: any[]) {
        let list: any[] = [];
        components.forEach(x => {
          try {
            let c = this.fetchDynamicComponent(x, x.codeReference);
            if (c != null) {
              list.push(c);
            }
            
          } catch (error) {
    
          }
    
    
        });
        return list;
      }
    
     
      fetchDynamicComponent(componentinfo: any, codeReference: string) {
    
        switch (codeReference) {
          case 'list-item':
            return new DynamicComponentItem(ListItemComponent, componentinfo, null);
            break;
            case 'page-editor':
            return new DynamicComponentItem(PageEditorComponent, componentinfo, null);
            break;
            case 'trial':
            return new DynamicComponentItem(TrialComponent, componentinfo, null);
            break;
          
          default:
            return null;
            break;
        }

}

}