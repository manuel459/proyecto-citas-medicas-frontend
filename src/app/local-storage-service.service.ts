import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }

  getItem(key:string):any
  {
    const item = localStorage.getItem(key);
    return item? JSON.parse(item) : null;
  }
}
