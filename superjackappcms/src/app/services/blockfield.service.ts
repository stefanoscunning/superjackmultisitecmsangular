import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {BlockField} from '../models';
import { SuperjackService } from './superjack.service';

@Injectable({providedIn: 'root'})
export class BlockFieldService {
    
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

    

    getAllByBlockId(blockId: number): Observable<BlockField[]> {
        return this.http.get<BlockField[]>(`${environment.api.url}/blockfields/blockid/` + blockId, {
            headers:  this.httpHeaders
        });
        
    }

    getAll(): Observable<BlockField[]> {
        return this.http.get<BlockField[]>(`${environment.api.url}/blockfields/all`, {
            headers:  this.httpHeaders
        });
        
    }

    getById(id: number): Observable<BlockField> {
        return this.http.get<BlockField>(`${environment.api.url}/blockfields/` + id, {
            headers:  this.httpHeaders
        });
        
    }


    create(item: BlockField): Observable<BlockField>{
        return this.http.post<BlockField>(`${environment.api.url}/blockfields`, item, {
            headers: this.httpHeaders
        });
    }

    update(item: BlockField){
        return this.http.put(`${environment.api.url}/blockfields/` + item.id, item,{
            headers: this.httpHeaders
        });
    }

    updateAll(blockId: number, items: BlockField[]){
        return this.http.put(`${environment.api.url}/blockfields/blockid/` + blockId, items,{
            headers: this.httpHeaders
        });
    }

    delete(id: number) {
        return this.http.delete(`${environment.api.url}/blockfields/` + id,{
            headers:  this.httpHeaders
        });
    }

    deleteByUuid(uuid: string) {
        return this.http.delete(`${environment.api.url}/blockfields/uuid/` + uuid,{
            headers:  this.httpHeaders
        });
    }
}