import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitesComponent } from './sites.component';

const routes: Routes = [
  {
    path: '',
     component: SitesComponent,
    data: {
      title: 'Sites'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesRoutingModule { }

export const routedComponents = [SitesComponent];