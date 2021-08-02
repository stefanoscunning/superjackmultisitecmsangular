import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';  
import { Transfer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SuperjackService {

  argoKey = environment.superjack.jason;
  key = CryptoJS.enc.Utf8.parse(this.argoKey);
  iv = CryptoJS.enc.Utf8.parse(this.argoKey);

  constructor() { }

  get use(): boolean {
    return environment.superjack.use;
  }

  decrypte(data: any): any {
    var decrypted = CryptoJS.AES.decrypt(data.payload, this.key,
    {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  encrypt(item: any){
    let transfer = new Transfer();

    transfer.payload = CryptoJS.AES.encrypt(JSON.stringify(item), this.key,
    {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    return transfer;
  }

}
