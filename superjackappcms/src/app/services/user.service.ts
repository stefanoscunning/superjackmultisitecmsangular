import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, Transfer } from '../models';
import { SuperjackService } from './superjack.service';

@Injectable({  providedIn: 'root'})
export class UserService {

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

     fetchAuthentication(username: string, client: string) : Observable<any>   {
        let resultObservable;
        if(!this.argo.use) {
          //resultObservable = this.http.post<User>(`${environment.api.url}/users/authenticate/user`, { username: username, client: client });      
          resultObservable = new Observable<any>(s=>{
            this.http.post<User>(`${environment.api.url}/users/authenticate/user`, { username: username, client: client }).subscribe(data=>{
                s.next(data);
              }, (error)=>{
                  this.router.navigate(['/authenticationerror']);
                  
              });
          }); 
        }
        else {
          let t = this.argo.encrypt({ username: username, client: client });
          resultObservable = new Observable<any>(s=>{
            this.http.post<Transfer>(`${environment.api.url}/users/en/authenticate/user`, t).subscribe(data=>{
                s.next(this.argo.decrypte(data));
              });
          });      
        }
       
        return resultObservable;
    }

     getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.api.url}/users`, {
            headers:  this.httpHeaders
        });
        
    }

    getById(id: number) {
        return this.http.get(`${environment.api.url}/users/` + id);
    }

    create(item: User): Observable<User>{
        return this.http.post<User>(`${environment.api.url}/users`, item, {
            headers: this.httpHeaders
        });
    }

    register(user: User) {
        return this.http.post(`${environment.api.url}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.api.url}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.api.url}/users/` + id);
    }
}