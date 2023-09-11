import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedObject: any;

  setObject(obj: any) {
    this.sharedObject = obj;
  }

  getObject() {
    return this.sharedObject;
  }
}