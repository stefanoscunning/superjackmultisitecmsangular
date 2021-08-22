import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ComponentPipe, SafePipe, SafeHtmlPipe } from './index';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        
    ],
    declarations: [
        ComponentPipe,
        SafePipe,
        SafeHtmlPipe        
    ],
    exports: [
        ComponentPipe,
        SafePipe,
        SafeHtmlPipe        
    ]
})
export class PipeModule { }
