import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';

@Component({
  selector: 'app-quizgrades',
  templateUrl: './quizgrades.component.html',
  styleUrls: ['./quizgrades.component.css']
})
export class QuizgradesComponent {
  IdParams : any ; 
  QuizGrades: any;
searchText: any;
  toastr: any;


  constructor(private myRoute: ActivatedRoute,
    private QuizServ: QuizService,){

    this.IdParams = myRoute.snapshot.paramMap.get('id');
    this.QuizGrades=null;


    this.QuizServ.GetQuizesResult(this.IdParams).subscribe({


      next: (data)=>{
    
    
        this.QuizGrades=data
      }
    })
    
  }

  deleteuserquiz(userquiz :any){

    this.QuizServ.delteuserquizm(userquiz).subscribe({


      next : (data)=> { 


 
      this.QuizServ.GetQuizesResult(this.IdParams).subscribe({


        next: (data)=>{
      
      
          this.QuizGrades=data
        }
      })
  
    }
    })
  }

}

