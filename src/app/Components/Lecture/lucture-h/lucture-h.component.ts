import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { LectuterAddDto } from 'src/app/TypeDto/ClassAddDto';
@Component({
  selector: 'app-lucture-h',
  templateUrl: './lucture-h.component.html',
  styleUrls: ['./lucture-h.component.css']
})
export class LuctureHComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private Getcalsss: GetAllLectureService,
    private AddLec: GetAllLectureService,
  ) { }
  ClassList!: any
  myFormGroup!: FormGroup;
  ClasssDto = new LectuterAddDto();
  isLinear = false;
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

  ngOnInit(): void {
    this.Getcalsss.GetAllClass().subscribe({
      next: (data) => {
        this.ClassList = data
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.myFormGroup = this._formBuilder.group({
      addvideos: this._formBuilder.array([])
    });
    
  }


  get addvideos(): FormArray { return this.myFormGroup.get('addvideos') as FormArray; }

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

  print() {
    console.log(this.addvideos.controls.length)
    console.log(this.myFormGroup.get('addvideos')?.value)
    console.log(this.firstFormGroup.value.ClassId)
    console.log(this.secondFormGroup.value.Header)
    this.LastForm.value.ClassId = this.firstFormGroup.value.ClassId
    this.LastForm.value.Header = this.secondFormGroup.value.Header
    this.LastForm.value.vedio = this.myFormGroup.get('addvideos')?.value

    this.AddLecture(this.LastForm);
  }



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

  removeVideo(index: number) {
    this.addvideos.removeAt(index);
  }
}



