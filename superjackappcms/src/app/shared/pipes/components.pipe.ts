import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'componentFilter' })
export class ComponentPipe implements PipeTransform {

transform(value:any[],searchString:string ){

       if(!searchString){
         //console.log('no search')
         return value  
       }

       return value.filter(it=>{ 
          const name = it.name!==null && it.name.toLowerCase().includes(searchString.toLowerCase());
           return (name);      
       }) 
    }
}