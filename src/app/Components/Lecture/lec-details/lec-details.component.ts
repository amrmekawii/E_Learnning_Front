import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssighmentService } from 'src/app/Services/Assighment/assighment.service';
import { SharedService } from 'src/app/Services/Shared/shared.service';
import { AssignmentDto } from 'src/app/TypeDto/AssighmentAllDto';
import { EditOrDetailsDto } from 'src/app/TypeDto/EditOrDetailsDto';

@Component({
  selector: 'app-lec-details',
  templateUrl: './lec-details.component.html',
  styleUrls: ['./lec-details.component.css']
})
export class LecDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private sharedService: SharedService, private fb: FormBuilder, private asighm: AssighmentService) { }
  receivedObject!: EditOrDetailsDto;
  receivedObject2!: any;

  editOrDetailsForm!: FormGroup;
  isReadOnly = true; // Initially, the form is in read-only mode
  editMode = false; // Indicates whether we're in edit mode or not
  IdAud?: number
  AllAssighment: AssignmentDto[] = []
  ngOnInit() {
    // Create the form controls
    this.editOrDetailsForm = this.fb.group({
      lectureId: [{ value: null, disabled: this.isReadOnly }, Validators.required],
      classId: [{ value: null, disabled: this.isReadOnly }, Validators.required],
      header: [{ value: '', disabled: this.isReadOnly }, Validators.required],
      quizId: [{ value: null, disabled: this.isReadOnly }],
      assignmentId: [{ value: null, disabled: this.isReadOnly }],
    });

    this.asighm.GetAllAssoghment().subscribe({
      next: (data) => {
        this.AllAssighment = data
      },
      error: (err) => {
        console.log(err);

      }
    })

    this.receivedObject = this.sharedService.getObject();
    this.receivedObject2 = this.sharedService.getObject2();

    this.editOrDetailsForm.patchValue(this.receivedObject);
    this.IdAud = this.receivedObject.lectureId
    console.log(this.IdAud + "---------------")
  }

  toggleEdit() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.editOrDetailsForm.enable();
    } else {
      this.editOrDetailsForm.disable();
    }
  }

  updateData(form: FormGroup) {

    console.log(form.value);

    this.editMode = false;
    this.editOrDetailsForm.disable();
  }
}

