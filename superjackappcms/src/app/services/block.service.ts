import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {Block} from '../models';
import { SuperjackService } from './superjack.service';

@Injectable({providedIn: 'root'})
export class BlockService {
    
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

    

    getAll(): Observable<Block[]> {
        return this.http.get<Block[]>(`${environment.api.url}/blocks/all`, {
            headers:  this.httpHeaders
        });
        
    }

    getById(id: number): Observable<Block> {
        return this.http.get<Block>(`${environment.api.url}/blocks/` + id, {
            headers:  this.httpHeaders
        });
        
    }


    create(item: Block): Observable<Block>{
        return this.http.post<Block>(`${environment.api.url}/blocks`, item, {
            headers: this.httpHeaders
        });
    }

    update(item: Block){
        return this.http.put(`${environment.api.url}/blocks/` + item.id, item,{
            headers: this.httpHeaders
        });
    }

    delete(id: number) {
        return this.http.delete(`${environment.api.url}/blocks/` + id,{
            headers:  this.httpHeaders
        });
    }

    deleteByUuid(uuid: string) {
        return this.http.delete(`${environment.api.url}/blocks/uuid/` + uuid,{
            headers:  this.httpHeaders
        });
    }
}