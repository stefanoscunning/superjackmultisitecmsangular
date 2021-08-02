import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    exports: [
        CommonModule,
        SidebarComponent,
        
    ],
    imports: [
        RouterModule,
        CommonModule,
       
        
    ],
    declarations: [
        SidebarComponent,
        
        
    ]
})
export class SharedModule { }
