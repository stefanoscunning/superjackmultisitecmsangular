import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, Renderer2 } from '@angular/core';

import { DynamicComponentDirective } from '../directives/dynamiccomponent.directive';
import { DynamicComponentItem }      from './dynamiccomponent-item';
import { DynamicComponent } from '../interfaces/dynamic.component';

@Component({
  selector: 'componentloader',
  template: `
              <div class="row">
                <ng-template component-host></ng-template>
              </div>
            `
})
export class ComponentLoaderComponent implements OnInit, OnDestroy {
  @Input() components!: DynamicComponentItem[];
  @ViewChild(DynamicComponentDirective, {static: true}) componentHost!: DynamicComponentDirective;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer2: Renderer2) { 
    
  }

  ngOnInit() {
    this.loadComponents();
   
  }

  ngOnDestroy() {

   
  }

  loadComponents(){
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    if(this.components.length>0){
      this.components.forEach(a=>{
        let componentItem = Object.create(a);
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentItem.component);
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<DynamicComponent>componentRef.instance).data = componentItem.data;
        (<DynamicComponent>componentRef.instance).componentinfo = componentItem.componentinfo;
        this.renderer2.addClass(componentRef.location.nativeElement, 'col-sm-12');
       
        
      });
    }
  }

  fetchDesktopSize(componentinfo: any){
    let size = componentinfo.component.desktopSize;
    return "col-sm-" + size;
  }

  

  
}

