import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AssighmentService } from 'src/app/Services/Assighment/assighment.service';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { AssignmentByIdDto } from 'src/app/TypeDto/AssighmentByIdDto';
import { UserAssighAnswerDTO } from 'src/app/TypeDto/AssighmentUaserAddDto';
import { UserAssighmentDto } from 'src/app/TypeDto/AssighmentsUserDto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lecture-assighment',
  templateUrl: './lecture-assighment.component.html',
  styleUrls: ['./lecture-assighment.component.css']
})
export class LectureAssighmentComponent implements OnInit {
  constructor(private StudentData: AuthenticationServiceService,
    private formBuilder: FormBuilder,
    private fileUplode: FilesService,
    private toastr: ToastrService,
    private location: Location,
    private myRoute: ActivatedRoute,
    private assigh: AssighmentService) {
    this.IdAssighment = myRoute.snapshot.paramMap.get('id');
  }

  StudentId?: string | null
  StudentName?: string | null

  IdAssighment: any
  Assighent = new AssignmentByIdDto()
  allUserAssighent: UserAssighmentDto[] = []
  UserAssighent = new UserAssighmentDto()

  UserSolveAssighment: boolean = true
  assignmentForm!: FormGroup;
  datasolveed=new UserAssighAnswerDTO()


  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      modelAnswerFilePath: ['', Validators.required],
    });
    this.StudentId = this.StudentData.UserData.Id
    this.StudentName = this.StudentData.UserData.name
    console.log(this.StudentId + 'student');

    //GetAssighmentById
    this.assigh.GetAssimentBtId(7).subscribe({
      next: (data) => {
        this.Assighent = data
        this.allUserAssighent = this.Assighent.userAssighments
        this.UserAssighent = this.allUserAssighent.find(x => x.studentid == this.StudentId) as UserAssighmentDto
        console.log(this.UserAssighent);

        if (this.UserAssighent === undefined) {
          this.UserSolveAssighment = false
          console.log('ssssssssssssssssssssff');

        }
      },

      error: (error) => {
console.log(error);

      }
    })
  }
  SendFile(forma:FormGroup){
    if(this.assignmentForm.valid){
      this.datasolveed.studentid=this.StudentId as string
      this.datasolveed.assighmentid=this.Assighent.id
      this.datasolveed.userAnswerFilePath=this.assignmentForm.value.modelAnswerFilePath
      this.assigh.AddUserAssighAnswer(this.datasolveed).subscribe({
        next: (data) => {
 
          this.toastr.success("Succes Solved Assighment")

          setTimeout(() => {
            this.location.back();
          }, 1500);
        
        },
  
        error: (err) => {
          this.toastr.warning(err)

        }
      })
    }
  }
  onFileSelected(formControlName: string, event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileUplode.Upload(file).subscribe((response) => {
        console.log(response);
        this.assignmentForm.get(formControlName)?.setValue(response.url);
      })
    }
  }
  openPdf(filePath: any) {
    if (filePath) {
      window.open(filePath, '_blank');
    }
    else {
      this.toastr.warning("Select File First")
    }
  }
}
