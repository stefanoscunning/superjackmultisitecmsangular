import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ComponentPipe, SafeHtmlPipe } from './index';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        
    ],
    declarations: [
        ComponentPipe,
        SafeHtmlPipe,
        
    ],
    exports: [
        ComponentPipe,
        SafeHtmlPipe,
        
    ]
})
export class PipeModule { }
