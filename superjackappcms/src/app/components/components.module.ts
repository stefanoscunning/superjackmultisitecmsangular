import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import {MatCardModule} from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TrialComponent} from './trial/trial.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        DragDropModule,
        FontAwesomeModule
        
    ],
    declarations: [
        PageEditorComponent,
        ListItemComponent,
        TrialComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers:[    ]
})
export class ComponentsModule { }
