import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService, UserService } from '../services';
import { first } from 'rxjs/operators';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
    email: string | undefined;
    pwd: string | undefined;
    currentUser: any;
    userId: number | undefined;

    constructor(private router: Router,
        private route: ActivatedRoute, public authService: AuthService, public userService: UserService) {

        let sessionUser = sessionStorage.getItem('currentUser');
        if (sessionUser != null) {

            this.currentUser = JSON.parse(sessionUser);
            if (this.currentUser && this.currentUser.token) {
                this.userId = this.currentUser.id;

            }
        }
    }
    



    // On submit button click    
    onSubmit() {


        if (this.email != null && this.pwd != null) {

            this.authService.login(btoa(this.email), btoa(this.pwd))
                .pipe(first())
                .subscribe(
                    data => {
                        let sessionUser = sessionStorage.getItem('currentUser');
                        if (sessionUser != null) {
                            let currentUser = JSON.parse(sessionUser);
                            if (currentUser && currentUser.token) {
                                //this.router.navigate(['/home']);
                                location.reload();
                            }
                        }
                    },
                    error => {
                        console.log(error);
                    });

        }


    }
    // On Forgot password link click
    onForgotPassword() {
        //this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        //this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    ngOnInit() {
        if(this.userId!=undefined){
            this.router.navigate(['/home']);
        }
    }
}

