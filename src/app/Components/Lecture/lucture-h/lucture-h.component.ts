import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { SharedService } from 'src/app/Services/Shared/shared.service';
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
    private fileUplode: FilesService
  ) { }

  ClassList!: any
  myFormGroup!: FormGroup;
  ClasssDto = new LectuterAddDto();
  isLinear = false;
  ClassLecId: GetLectByClassIdDto[] = []
  ClassNameHeader: any
  EditOrDeatails = new EditOrDetailsDto()
  FiristId: any
  searchText = '';

  firstFormGroup = this._formBuilder.group({
    ClassId: [0, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    Header: ['', [Validators.required, Validators.minLength(5)]],
  });
  LastForm = this._formBuilder.group({
    ClassId: [0, Validators.required],
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
  //////////////////////////////////handelfile
  Uplodfile(e: Event,index: number) {
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
  AddLecture(data: any) {
    console.log(data.value)
    this.ClasssDto.classid = data.value.ClassId
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
    this.router.navigate(['EditOrDetailsLecture']);



  }


  /////////////////CallWhenAddVedioInList
  addVideo() {
  const  videoFormGroup = this._formBuilder.group({
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
}



