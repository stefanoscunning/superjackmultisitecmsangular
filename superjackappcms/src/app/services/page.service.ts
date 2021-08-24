import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {Page, PageSearchFilter} from '../models';
import { SuperjackService } from './superjack.service';

@Injectable({providedIn: 'root'})
export class PageService {
    
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

    

    getAll(): Observable<Page[]> {
        return this.http.get<Page[]>(`${environment.api.url}/pages/all`, {
            headers:  this.httpHeaders
        });
        
    }

    getAllBySiteId(siteId: number): Observable<Page[]> {
        return this.http.get<Page[]>(`${environment.api.url}/pages/siteid/` + siteId, {
            headers:  this.httpHeaders
        });
        
    }

    getTreeBySiteId(siteId: number): Observable<Page[]> {
        return this.http.get<Page[]>(`${environment.api.url}/pages/tree/` + siteId, {
            headers:  this.httpHeaders
        });
        
    }


    getAllByQuery(siteId: number): Observable<Page[]> {
        return this.http.get<Page[]>(`${environment.api.url}/pages/query`, {
            headers:  this.httpHeaders
        });
        
    }

    getByQuery(item: PageSearchFilter): Observable<Page[]>{
        return this.http.post<Page[]>(`${environment.api.url}/pages/querysearch`, item, {
            headers: this.httpHeaders
        });
    }

    getById(id: number): Observable<Page> {
        return this.http.get<Page>(`${environment.api.url}/pages/` + id, {
            headers:  this.httpHeaders
        });
        
    }


    create(item: Page): Observable<Page>{
        return this.http.post<Page>(`${environment.api.url}/pages`, item, {
            headers: this.httpHeaders
        });
    }

    update(item: Page){
        return this.http.put(`${environment.api.url}/pages/` + item.id, item,{
            headers: this.httpHeaders
        });
    }

    delete(id: number) {
        return this.http.delete(`${environment.api.url}/pages/` + id,{
            headers:  this.httpHeaders
        });
    }

    
}