import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {PageBlock} from '../models';
import { SuperjackService } from './superjack.service';

@Injectable({providedIn: 'root'})
export class PageBlockService {
    
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

    

    getAll(): Observable<PageBlock[]> {
        return this.http.get<PageBlock[]>(`${environment.api.url}/pageblocks/all`, {
            headers:  this.httpHeaders
        });
        
    }

    getAllByPageId(pageid: number): Observable<PageBlock[]> {
        return this.http.get<PageBlock[]>(`${environment.api.url}/pageblocks/pageid/` + pageid, {
            headers:  this.httpHeaders
        });
        
    }

    getAllByPageIdParentIdLevel(pageid: number, parentid: number, level: number): Observable<PageBlock[]> {
        return this.http.get<PageBlock[]>(`${environment.api.url}/pageblocks/pageid/` + pageid + `/` + parentid + `/` + level, {
            headers:  this.httpHeaders
        });
        
    }

    getById(id: number): Observable<PageBlock> {
        return this.http.get<PageBlock>(`${environment.api.url}/pageblocks/` + id, {
            headers:  this.httpHeaders
        });
        
    }


    create(item: PageBlock): Observable<PageBlock>{
        return this.http.post<PageBlock>(`${environment.api.url}/pageblocks`, item, {
            headers: this.httpHeaders
        });
    }

    update(item: PageBlock){
        return this.http.put(`${environment.api.url}/pageblocks/` + item.id, item,{
            headers: this.httpHeaders
        });
    }

    delete(id: number) {
        return this.http.delete(`${environment.api.url}/pageblocks/` + id,{
            headers:  this.httpHeaders
        });
    }

    deleteByUuid(uuid: string) {
        return this.http.delete(`${environment.api.url}/pageblocks/uuid/` + uuid,{
            headers:  this.httpHeaders
        });
    }
}