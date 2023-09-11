import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-option',
  templateUrl: './choose-option.component.html',
  styleUrls: ['./choose-option.component.css']
})
export class ChooseOptionComponent implements OnInit{
@Input()IdPram ?:number
constructor( private router :Router){}
  Get(){
    console.log(this.IdPram+"ssssssssssssss");
    
    this.router.navigate(['/ShowAudance',{id:this.IdPram}])

  }
ngOnInit(): void {

}
  
}
