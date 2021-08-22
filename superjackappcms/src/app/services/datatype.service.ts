import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {

  confirmedDataType!: string;

  constructor() { }

  getDataType(obj: any): string{
      try {
          if(this.isFormattedDate(obj)){
              this.confirmedDataType = 'date';
          }
          else if(this.isFormattedBoolean(obj)){
              this.confirmedDataType = 'boolean';
          }
          else if(this.isFormattedNumber(obj)){
              this.confirmedDataType = 'number';
          }
          else if(this.isFormattedString(obj)){
              this.confirmedDataType = 'string';
          }
          else{
              this.confirmedDataType = 'unknown';
          }
          
      } catch (error) {
          this.confirmedDataType = 'error';
      }
      return this.confirmedDataType;
  }

  isFormattedDate(obj: any): boolean{
      let d = new Date(obj);
      if(d){
          var month = d.getMonth();
          if(month){
              return true;
          }
          return false;
      }
      return false;
  }

  isFormattedString(obj: any): boolean{
      let s: string = obj;
      if(s && s!=undefined && s!=null && s.length>0){
          return true;
      }
      return false;
  }

  isFormattedBoolean(obj: any): boolean{
    let b: boolean = obj;
    if ((typeof(b) === typeof(true)) || (typeof(b)===typeof(false))) {
        return true;
    }
    return false;
  }

  isFormattedNumber(obj: any): boolean{
      let n: number = obj;
      if(!isNaN(n) && typeof(n)==='number'){
          return true;
      }
      return false;

  }

 
 

}
