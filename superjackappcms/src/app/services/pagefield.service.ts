import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {PageField} from '../models';
import { SuperjackService } from './superjack.service';

@Injectable({providedIn: 'root'})
export class PageFieldService {
    
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

    

    getAll(): Observable<PageField[]> {
        return this.http.get<PageField[]>(`${environment.api.url}/pagefields/all`, {
            headers:  this.httpHeaders
        });
        
    }

    getById(id: number): Observable<PageField> {
        return this.http.get<PageField>(`${environment.api.url}/pagefields/` + id, {
            headers:  this.httpHeaders
        });
        
    }


    create(item: PageField): Observable<PageField>{
        return this.http.post<PageField>(`${environment.api.url}/pagefields`, item, {
            headers: this.httpHeaders
        });
    }

    update(item: PageField){
        return this.http.put(`${environment.api.url}/pagefields/` + item.id, item,{
            headers: this.httpHeaders
        });
    }

    delete(id: number) {
        return this.http.delete(`${environment.api.url}/pagefields/` + id,{
            headers:  this.httpHeaders
        });
    }

    deleteByUuid(uuid: string) {
        return this.http.delete(`${environment.api.url}/pagefields/uuid/` + uuid,{
            headers:  this.httpHeaders
        });
    }
}