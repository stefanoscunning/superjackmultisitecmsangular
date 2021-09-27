import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PageBlocksComponent } from './pageblocks/pageblocks.component';

const routes: Routes = [
  {
    path: '',
     component: PagesComponent,
    data: {
      title: 'Pages'
    }    
  },
  { path: 'pages/:siteid/:pageid', component: PagesComponent, data: {  } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }

export const routedComponents = [PagesComponent];