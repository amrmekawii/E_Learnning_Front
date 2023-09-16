import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AssighmentService } from 'src/app/Services/Assighment/assighment.service';
import { SharedService } from 'src/app/Services/Shared/shared.service';
import { CorrectUserAssighmentDto } from 'src/app/TypeDto/AssighmenyCorrectDto';

@Component({
  selector: 'app-correct-ans',
  templateUrl: './correct-ans.component.html',
  styleUrls: ['./correct-ans.component.css']
})
export class CorrectAnsComponent implements OnInit {
constructor(    private SharedService: SharedService,

  private Assighment:AssighmentService,
  private formBuilder: FormBuilder,
  private toastr: ToastrService,


  ){}

  DataUserCorrect:any
  assignmentForm!: FormGroup;
  CorrectUserAssighment =new CorrectUserAssighmentDto()
  ngOnInit(): void {

    this.DataUserCorrect= this.SharedService.getUserAnsModel()
    console.log(this.DataUserCorrect.checked);
    this.assignmentForm = this.formBuilder.group({
      studentid: ['', Validators.required],
      assighmentid: ['', Validators.required],
      comment: ['', Validators.required],
      checked: [Boolean, Validators.required] 
    });
    this.assignmentForm.patchValue({
      studentid:this.DataUserCorrect.studentid,
      assighmentid:this.DataUserCorrect.assighmentid,
      checked:this.DataUserCorrect.checked

    });



  }

  Correct(Forma:FormGroup){
if(this.assignmentForm.valid)
{
this.CorrectUserAssighment.studentid = Forma.value.studentid
this.CorrectUserAssighment.assighmentid = Forma.value.assighmentid
this.CorrectUserAssighment.comment = Forma.value.comment
this.CorrectUserAssighment.checked = Forma.value.checked
console.log(this.CorrectUserAssighment);


this.Assighment.CorrectAssiment(this.CorrectUserAssighment).subscribe({
  next:(data)=>{
    this.toastr.success("Update Done",data)

  },
  error:(err)=>{
    console.log(err);
    
    this.toastr.error(err.error)

  }
})
}
  }
  openPdf(filePath: string) {
    if (filePath) {

      window.open(filePath, '_blank');
    }
  }
}
