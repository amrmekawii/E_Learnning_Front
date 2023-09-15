import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssighmentService } from 'src/app/Services/Assighment/assighment.service';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { AssignmentByIdDto } from 'src/app/TypeDto/AssighmentByIdDto';
import { UdateAssighmentDto } from 'src/app/TypeDto/AssighmentUpdateDto';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';

@Component({
  selector: 'app-details-assighment',
  templateUrl: './details-assighment.component.html',
  styleUrls: ['./details-assighment.component.css']
})
export class DetailsAssighmentComponent implements OnInit {
  IdParams!: any;
  assignmentForm!: FormGroup;
  isEditMode = false;
  AllCalss: ClassAllDto[] = [];
  UpdateData = new UdateAssighmentDto()
  addighmentdata!: AssignmentByIdDto
  constructor(private myRoute: ActivatedRoute,
    private toastr: ToastrService,
    private assghm: AssighmentService,
    private formBuilder: FormBuilder,
    private Getcalsss: GetAllLectureService,
    private fileUplode: FilesService
  ) {
    this.IdParams = myRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {

    this.assghm.GetAssimentBtId(this.IdParams).subscribe({
      next: (data) => {
        this.addighmentdata = data;
        console.log(this.addighmentdata);

        this.assignmentForm.patchValue({
          id: this.addighmentdata.id,
          classid: this.addighmentdata.classid,
          filePath: this.addighmentdata.filePath,
          header: this.addighmentdata.header,
          modelAnswerFilePath: this.addighmentdata.modelAnswerFilePath,
          updatedBy: this.addighmentdata.updatedBy,
          updatedat: this.addighmentdata.updatedat,
        });

      },
      error: (error) => {
        // Handle error
      }
    });

    this.assignmentForm = this.formBuilder.group({
      id: ['', Validators.required],
      classid: ['', Validators.required],
      filePath: ['', Validators.required],
      header: ['', Validators.required],
      modelAnswerFilePath: ['', Validators.required],
      updatedBy: ['', Validators.required],
      updatedat: ['', Validators.required],
    });
    this.assignmentForm.disable();

    this.Getcalsss.GetAllClass().subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i++) {
          const classDto = new ClassAllDto();
          classDto.id = data[i].id;
          classDto.name = data[i].name;
          this.AllCalss.push(classDto);
        }

      },
      error: (error) => {
        console.log("Assighment error" + error);
      }
    });
  }

  enableEditMode(): void {
    this.isEditMode = true;
    this.assignmentForm.enable();
  }

  submitForm(form: FormGroup): void {
    console.log(form);
    console.log("==================");
    if (this.assignmentForm.valid) {
      const formValues = this.assignmentForm.value;
      this.UpdateData.id = this.assignmentForm.value.id
      this.UpdateData.filePath = this.assignmentForm.value.filePath
      this.UpdateData.header = this.assignmentForm.value.header
      this.UpdateData.modelAnswerFilePath = this.assignmentForm.value.modelAnswerFilePath
      this.UpdateData.classid = this.assignmentForm.value.classid
      this.UpdateData.updatedBy = this.assignmentForm.value.updatedBy
      this.UpdateData.updatedat = new Date().toISOString();

      this.assghm.UpdateAssiment(this.UpdateData).subscribe({
        next: (data) => {
          this.toastr.success("Update Done")

        },
        error: (error) => {
          this.toastr.error(error)

        }

      })
      console.log(formValues);
      // Disable the form after saving
      this.assignmentForm.disable();
      this.isEditMode = false;
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
  openPdf(filePath: string) {
    if (filePath) {

      window.open(filePath, '_blank');
    }
  }
}