import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssighmentService } from 'src/app/Services/Assighment/assighment.service';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { AddAssighmentDto } from 'src/app/TypeDto/AssighmentAddDto';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';

@Component({
  selector: 'app-add-assighment',
  templateUrl: './add-assighment.component.html',
  styleUrls: ['./add-assighment.component.css']
})
export class AddAssighmentComponent implements OnInit {
  assignmentForm!: FormGroup;
  AllClasses: ClassAllDto[] = [];
  DataAddAssghment = new AddAssighmentDto()
  constructor(
    private toastr: ToastrService,
    private assghm: AssighmentService,
    private formBuilder: FormBuilder,
    private fileUpload: FilesService,
    private Getcalsss: GetAllLectureService,
    private fileUplode: FilesService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      filePath: ['', Validators.required],
      header: ['', Validators.required],
      modelAnswerFilePath: ['', Validators.required],
      classid: [null, Validators.required] // You may initialize it to null
    });

    this.Getcalsss.GetAllClass().subscribe({
      next: (data) => {
        this.AllClasses = data;
      },
      error: (error) => {
        console.log('Assighment error: ' + error);
      }
    });
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
  openPdf(filePath: string) {
    if (filePath) {

      window.open(filePath, '_blank');
    }
  }

  submitForm(form: FormGroup) {
    this.DataAddAssghment.classid = form.value.classid
    this.DataAddAssghment.filePath = form.value.filePath
    this.DataAddAssghment.header = form.value.header
    this.DataAddAssghment.modelAnswerFilePath = form.value.modelAnswerFilePath
    if (this.assignmentForm.valid) {
      this.assghm.AddAssiment(this.DataAddAssghment).subscribe({

        next: (data) => {
          this.toastr.success("Assighment Added")
          setTimeout(() => {
            this.router.navigateByUrl('/AdminHome/AllAssighment')   
          },1800);
             },
        error: (error) => {
          console.log('Assighment error: ' + error);
          this.toastr.error(error.error)
        }
      })
    }
    else {
      this.toastr.warning("Check Assighment Data")
    }
  }
}
