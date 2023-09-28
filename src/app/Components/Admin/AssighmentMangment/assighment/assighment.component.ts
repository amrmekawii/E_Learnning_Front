


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AssighmentService } from 'src/app/Services/Assighment/assighment.service';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { DeleteAssighmentDto } from 'src/app/TypeDto/AssighmentAddDto';
import { AssignmentDto } from 'src/app/TypeDto/AssighmentAllDto';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';

@Component({
  selector: 'app-assighment',
  templateUrl: './assighment.component.html',
  styleUrls: ['./assighment.component.css'],
})
export class AssighmentComponent implements OnInit {
  constructor(
    private Assighment: AssighmentService,
    private Getcalsss: GetAllLectureService,
    private modalservice: NgbModal,
    private form: FormBuilder,
    private toastr: ToastrService,
  ) {}

  searchText = '';
  AllAssighment: AssignmentDto[] = [];
  AllCalss: ClassAllDto[] = [];
  AllCalss4?: ClassAllDto;
  @ViewChild('content') popupview!: ElementRef;
  AssighmentNameDelete: string = '';
  AssighmentIdDelete: number = 0;
  nameForm!: FormGroup;
  Delateass = new DeleteAssighmentDto();

  ngOnInit(): void {
    this.loadAssighments(); // Load initial data
  }

  loadAssighments() {
    this.Assighment.GetAllAssoghment().subscribe({
      next: (data) => {
        this.AllAssighment = data.map((item) => {
          const assignment = new AssignmentDto();
          assignment.classid = item.classid;
          assignment.filePath = item.filePath;
          assignment.id = item.id;
          assignment.header = item.header;
          return assignment;
        });

        this.loadClasses();
      },
      error: (error) => {
        console.log('Assighment error: ' + error);
      },
    });
  }

  loadClasses() {
    this.Getcalsss.GetAllClass().subscribe({
      next: (data) => {
        this.AllCalss = data.map((item) => {
          const classDto = new ClassAllDto();
          classDto.id = item.id;
          classDto.name = item.name;
          return classDto;
        });
        console.log(this.AllCalss);
        

        // Update the class names for the assignments
        this.AllAssighment.forEach((assignment) => {
          const classData = this.AllCalss.find(x => x.id === assignment.classid);
          if (classData) {
            assignment.classid = classData.name;
          }
        });
      },
      error: (error) => {
        console.log('Assighment error: ' + error);
      },
    });
  }

  showpdf(anmeASS: string, Id: number) {
    this.AssighmentIdDelete = Id;
    this.AssighmentNameDelete = anmeASS;
    this.nameForm = this.form.group({
      name: ['', [Validators.required]],
    });
    this.modalservice.open(this.popupview, { size: 'lg' });
  }

  onSubmit() {
    this.Delateass.id = this.AssighmentIdDelete;
    this.Delateass.name = this.nameForm.value.name;
    console.log(this.Delateass);
    this.Assighment.DeleteAssiment(this.Delateass).subscribe({
      next: (data) => {
        this.toastr.success('Assighment (' + this.Delateass.name + ') Deleted');

        // Remove the deleted assignment from the list
        const index = this.AllAssighment.findIndex(
          (assignment) => assignment.id === this.Delateass.id
        );
  
        this.modalservice.dismissAll()

        setTimeout(() => {
          if (index !== -1) {
            this.AllAssighment.splice(index, 1);
          }
        }, 1500);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
      },
    });
  }
}
