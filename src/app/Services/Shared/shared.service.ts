import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedObject: any;
  private sharedObject2: any;

  setObject(obj: any) {
    this.sharedObject = obj;
  }

  SetLecandClssname(obj: any){
    this.sharedObject2 = obj;

  }


  ////////////
  getObject() {
    return this.sharedObject;
  }
  getObject2() {
    return this.sharedObject2;
  }


}