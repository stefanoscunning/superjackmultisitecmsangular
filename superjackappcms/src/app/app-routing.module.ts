import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {ROUTES} from './shared/routes/routes';
import { AuthGuard } from './services';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  },
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '', 
    component: LayoutComponent, 
    data: { title: '' }, 
    children: ROUTES, 
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Tell the router to use the HashLocationStrategy.
    useHash: false,
    enableTracing: false,
    // This will tell Angular to preload the lazy-loaded routes after the
    // application has been bootstrapped. This will extend to both top-level
    // and nested lazy-loaded modules.
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: "legacy"
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
