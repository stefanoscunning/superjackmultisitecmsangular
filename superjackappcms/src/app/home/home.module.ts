import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import {MatCardModule} from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ComponentsModule} from '../components/components.module';
import { ComponentLoaderComponent }    from '../dynamic/componentloader.component';
import { DynamicComponentDirective }          from '../directives/dynamiccomponent.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        DragDropModule,
        ComponentsModule,
        FontAwesomeModule
        
    ],
    declarations: [
        HomeComponent,
        ComponentLoaderComponent,
        DynamicComponentDirective
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers:[    ]
})
export class HomeModule { }
