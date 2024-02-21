import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/Components/Lecture/add-user-access/add-user-access.component';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { SharedService } from 'src/app/Services/Shared/shared.service';
import { AddUserAccessDto } from 'src/app/TypeDto/AddUserAccessDto';
import { ClassActive } from 'src/app/TypeDto/ClassIdActive';
import { EditOrDetailsDto } from 'src/app/TypeDto/EditOrDetailsDto';

@Component({
  selector: 'app-quiz-acess',
  templateUrl: './quiz-acess.component.html',
  styleUrls: ['./quiz-acess.component.css']
})
export class QuizAcessComponent implements OnInit   {

  Addacess:any=null
  ShowAcesses:any=null
usertoquiz:any
  searchText = '';
  accesedStudents : any;
wrong:any
  userids : {userid:string}[]=[]
  alluserids : {userid:string}[]=[]


  idpram:any

  objectUserForAccessService: AddUserAccessDto[]=[]

  
  constructor(private ShareService: SharedService, private GetAllActive: GetAllLectureService,    private toastr: ToastrService
   , private  myRoute :ActivatedRoute  ) { 


   }
  ngOnInit(): void {

    this.idpram = this.myRoute.snapshot.paramMap.get('id');
    this.GetAllActive.GetUsertoAcessQuiz(this.idpram).subscribe({

      next:(data)=> {this.usertoquiz=data
        console.log(this.usertoquiz);
        this.Addacess=true
        this.ShowAcesses=null;  
        this.wrong=false

      
      },
      error:(err)=>{
this.wrong=true

      }
      
      
      })
  


}

onCheckChange(event: any) {
console.log(event);
  /* Selected */
  if(event.target.checked){
    // Add a new control in the arrayForm
    let x :string =event.target.value;
    
  this.userids.push( {userid:event.target.value});

    console.log(this.userids);
  }
  /* unselected */
  else{
    // find the unselected element

    console.log("Sadasdasdasdasd")
    let i: number = 0;

    this.userids.forEach((ctrl) => {
      if(ctrl.userid  == event.target.value ) {
        // Remove the unselected element from the arrayForm

console.log(   "  no ")

const index = this.userids.indexOf(ctrl);

this.userids.splice(index, 1);  

console.log(this.userids)

return;
      }

      i++;
    });}
}

saveSelectedRows(){

  this.GetAllActive.SavequizAcess({quizid:this.idpram , users:this.userids}).subscribe({


    next:(data)=> {

this.toastr.success("acess added to  "+this.userids.length +"  Students" )


this.GetAllActive.GetUsertoAcessQuiz(this.idpram).subscribe({

  next:(data)=> {this.usertoquiz=data
    console.log(this.usertoquiz);
    this.Addacess=true
  
  
  }
  
  
  })
  this.userids.length=0


    },
    error:(err)=> this.toastr.error("something went wrong")
  })

}


AddtoallStudents(){
  this.usertoquiz.users.forEach((x:any)=>{

let y = {userid:x.userid}
this.alluserids.push(y);

  })
  console.log(this.alluserids )
  this.GetAllActive.SavequizAcess({quizid:this.idpram , users:this.alluserids}).subscribe({


    next:(data)=> {

this.toastr.success("acess added to  "+this.alluserids.length +"  Students" )
this.GetAllActive.GetUsertoAcessQuiz(this.idpram).subscribe({

  next:(data)=> {this.usertoquiz=data
    console.log(this.usertoquiz);
    this.Addacess=true
    this.ShowAcesses=null;  

  
  }
  
  
  })




this.userids.length=0
this.alluserids.length=0

    },
    error:(err)=> this.toastr.error("something went wrong")
  })


}
acces(){
  this.GetAllActive.GetUsertoAcessQuiz(this.idpram).subscribe({

    next:(data)=> {this.usertoquiz=data
      console.log(this.usertoquiz);
      this.Addacess=true
      this.ShowAcesses=null;  

    
    }
    
    
    })
    
}

show(){

  this.usertoquiz.users=null;
  this.Addacess=null;
  this.ShowAcesses=true;

console.log(this.Addacess)
  this.GetAllActive.GetQuizAcessToAdmin(this.idpram).subscribe({


    next:(data)=> {

      this.accesedStudents=data;
      console.log(this.accesedStudents)
    }
  })

}

deletequizAcess(id:any){
this.GetAllActive.DeleteUserAcessQuiz(id).subscribe({


  next:(data)=>{

this.toastr.success("Acess Deleted")
this.show();
  }
})
}
}