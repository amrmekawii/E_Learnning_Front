import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { SharedService } from 'src/app/Services/Shared/shared.service';
import { DeleteLectureDto } from 'src/app/TypeDto/AssighmentAddDto';
import { AssignmentAndQuizCascadeDto } from 'src/app/TypeDto/AssighmentAllDto';
import { EditOrDetailsDto } from 'src/app/TypeDto/EditOrDetailsDto';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';
import { LectuterAddDto } from 'src/app/TypeDto/LectureAddDto';
@Component({
  selector: 'app-lucture-h',
  templateUrl: './lucture-h.component.html',
  styleUrls: ['./lucture-h.component.css'],
})
export class LuctureHComponent implements OnInit {


  constructor(
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private Getcalsss: GetAllLectureService,
    private AddLec: GetAllLectureService,
    private router: Router,
    private sharedService: SharedService,
    private fileUplode: FilesService,
    private modalservice: NgbModal,

  ) { }
  nameForm!: FormGroup;
  AssighmentNameDelete: string = '';
  AssighmentIdDelete: number = 0;
  @ViewChild('content') popupview!: ElementRef;
  Delateass = new DeleteLectureDto();

  ClassList!: any
  myFormGroup!: FormGroup;
  ClasssDto = new LectuterAddDto();
  isLinear = false;
  ClassLecId: GetLectByClassIdDto[] = []
  ClassNameHeader: any
  EditOrDeatails = new EditOrDetailsDto()
  FiristId: any
  searchText = '';
  AssignmentCascadeDto: AssignmentAndQuizCascadeDto[] = []
  QuizCascadeDto: AssignmentAndQuizCascadeDto[] = []
  firstFormGroup = this._formBuilder.group({
    ClassId: [0, Validators.required],
    AssighmentID: [0,[]],
    QuizID: [0],
  });
  secondFormGroup = this._formBuilder.group({
    Header: ['', [Validators.required, Validators.minLength(5)]],
  });
  LastForm = this._formBuilder.group({
    ClassId: [0, Validators.required],
    assighnmentid: [0],
    quizid: [0],
    Header: ['', [Validators.required, Validators.minLength(5)]],
    vedio: [[], Validators.required]
  });

  /////////////////////////////////////////////OninIt
  ngOnInit() {
    this.Getcalsss.GetAllClass().subscribe({
      next: (data) => {
        this.ClassList = data
        console.log(this.ClassList[0].id)

        this.FiristId = this.ClassList[0].id;
        this.Getcalsss.GetLecByClassId(this.ClassList[0].id).subscribe({
          next: (data) => {
            console.log(data)
            this.ClassLecId = data as GetLectByClassIdDto[]
            console.log(this.ClassLecId)
            this.ClassNameHeader = this.ClassLecId[0]["className"]
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.myFormGroup = this._formBuilder.group({
      addvideos: this._formBuilder.array([])
    })
  }
  //////////////
  GetAssandQuiz(calssID: number) {
    console.log(calssID + "..................");

    this.AddLec.GetAllAssighmentsByClass(calssID).subscribe({
      next: (data) => {
        this.AssignmentCascadeDto = data
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.AddLec.GetAllQuizsByClass(calssID).subscribe({
      next: (data) => {
        this.QuizCascadeDto = data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //////////////////////////////////handelfile
  Uplodfile(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;
    this.fileUplode.Upload(file).subscribe((response) => {
      console.log(response);
      this.addvideos.at(index).get('link')?.setValue(response.url)
    })
  }

  ////////////////////////////////////////////FireWhenSelectClass
  onMyVariableChange(ClassID: number) {
    this, this.FiristId = ClassID
    console.log('myVariable changed in the child component:', ClassID);
    this.Getcalsss.GetLecByClassId(ClassID).subscribe({
      next: (data) => {
        console.log(data)
        if (data != null) {
          this.ClassLecId = data as GetLectByClassIdDto[]
          console.log(this.ClassLecId)
          this.ClassNameHeader = this.ClassLecId[0]["className"]
        } else {
          this.toastr.warning("This Class (" + ClassID + ") Has No Data")
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }






  /////////////////////ForAddLect2
  AddLecture(data: FormGroup) {
    console.log(data);


      console.log(data.value)
      this.ClasssDto.classid = data.value.ClassId
      if(this.firstFormGroup.value?.AssighmentID!=0){
        this.ClasssDto.assighnmentid = data.value.assighnmentid
  
      }
      if(this.firstFormGroup.value?.QuizID!=0){
        this.ClasssDto.quizid = data.value.quizid
  
      }
      this.ClasssDto.header = data.value.Header
      this.ClasssDto.addvideos = data.value.vedio
      console.log(this.ClasssDto)
      this.AddLec.AddLec(this.ClasssDto).subscribe({

        next: (data) => {
          console.log(data);
          this.toastr.success("Done", "success Added")

        },
        error: (err) => {
          console.log(err)
          this.toastr.error(err.error)

        },
      })
  
  }
  /////////////////////ForAddLect1
  print() {
    // console.log(this.addvideos.controls.length)
    // console.log(this.myFormGroup.get('addvideos')?.value)
    // console.log(this.firstFormGroup.value.ClassId)
    // console.log(this.secondFormGroup.value.Header)
    this.LastForm.value.ClassId = this.firstFormGroup.value.ClassId
    if(this.firstFormGroup.value?.AssighmentID!=0){
      this.LastForm.value.assighnmentid = this.firstFormGroup.value?.AssighmentID

    }
    else{
      this.LastForm.value.assighnmentid = 0
    }
    if(this.firstFormGroup.value?.QuizID!=0){
      this.LastForm.value.quizid = this.firstFormGroup.value?.QuizID

    }else{
      this.LastForm.value.quizid =0
    }
    this.LastForm.value.Header = this.secondFormGroup.value.Header
    this.LastForm.value.vedio = this.myFormGroup.get('addvideos')?.value
    this.AddLecture(this.LastForm);
  }


  /////////////////////ForEditOrDetails
  EditOrDetails(LecId: any, Classid: any, Header: any, quizid: any, assid: any, clasj: any) {
    this.EditOrDeatails.lectureId = LecId
    this.EditOrDeatails.classId = Classid
    this.EditOrDeatails.header = Header
    this.EditOrDeatails.quizId = quizid
    this.EditOrDeatails.assignmentId = assid
    console.log(this.EditOrDeatails)
    this.sharedService.setObject(this.EditOrDeatails);
    this.sharedService.SetLecandClssname({ ClassName: clasj, LectureName: Header });
    this.router.navigate(['AdminHome/EditOrDetailsLecture']);



  }


  /////////////////CallWhenAddVedioInList
  addVideo() {
    const videoFormGroup = this._formBuilder.group({
      link: ['', Validators.required],
      partHeader: ['', [Validators.required, Validators.minLength(5)]],
      number: [0, Validators.required]
    });

    if (this.myFormGroup.get('addvideos')?.valid || this.addvideos.controls.length == 0) {
      this.addvideos.push(videoFormGroup);
    }
  }

  get addvideos(): FormArray { return this.myFormGroup.get('addvideos') as FormArray; }


  /////////////////CallWhenRemoveVedioInList
  removeVideo(index: number) {
    this.addvideos.removeAt(index);
  }

  /////DeLETE
  showpdf(anmeASS: string, Id: number) {
    this.AssighmentIdDelete = Id;
    this.AssighmentNameDelete = anmeASS;
    this.nameForm = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.modalservice.open(this.popupview, { size: 'lg' });
  }

  onSubmit() {
    this.Delateass.id = this.AssighmentIdDelete;
    this.Delateass.name = this.nameForm.value.name;
    console.log("...........................................");
    console.log(this.Delateass);
    this.AddLec.DeleteLecture(this.Delateass).subscribe({
      next: (data) => {
        this.toastr.success('Lecture (' + this.Delateass.name + ') Deleted');

        // Remove the deleted assignment from the list
        const index = this.ClassLecId.findIndex(
          (assignment) => assignment.lectureId === this.Delateass.id
        );

        this.modalservice.dismissAll()

        setTimeout(() => {
          if (index !== -1) {
            this.ClassLecId.splice(index, 1);
          }
        }, 1500);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.title);
      },
    });
  }
}



