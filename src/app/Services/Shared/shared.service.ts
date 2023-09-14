import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedObject: any;
  private sharedObject2: any;
private pathshares:any
  setObject(obj: any) {
    this.sharedObject = obj;
  }

  SetLecandClssname(obj: any){
    this.sharedObject2 = obj;

  }
  setpath(bbj:any){
this.pathshares =bbj
  }

  ////////////
  getObject() {
    return this.sharedObject;
  }
  getObject2() {
    return this.sharedObject2;
  }
getpath(){
  return this.pathshares
}

}