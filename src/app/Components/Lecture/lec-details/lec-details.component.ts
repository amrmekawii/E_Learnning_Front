import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Services/Shared/shared.service';
import { EditOrDetailsDto } from 'src/app/TypeDto/EditOrDetailsDto';

@Component({
  selector: 'app-lec-details',
  templateUrl: './lec-details.component.html',
  styleUrls: ['./lec-details.component.css']
})
export class LecDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute ,private sharedService: SharedService,private fb: FormBuilder) {}
  receivedObject!: EditOrDetailsDto;





editOrDetailsForm!: FormGroup;
isReadOnly = true; // Initially, the form is in read-only mode
editMode = false; // Indicates whether we're in edit mode or not
IdAud?:number

ngOnInit() {
  // Create the form controls
  this.editOrDetailsForm = this.fb.group({
    lectureId: [{ value: null, disabled: this.isReadOnly }, Validators.required],
    classId: [{ value: null, disabled: this.isReadOnly }, Validators.required],
    header: [{ value: '', disabled: this.isReadOnly }, Validators.required],
    quizId: [{ value: null, disabled: this.isReadOnly }],
    assignmentId: [{ value: null, disabled: this.isReadOnly }],
  });

  this.receivedObject = this.sharedService.getObject();
 
  console.log(this.receivedObject);
  // Fetch data from the backend and populate the form
  // Replace this with your actual API call

  this.editOrDetailsForm.patchValue(this.receivedObject);
  this.IdAud=this.receivedObject.lectureId
  console.log(this.IdAud + "amrrrrrrrrrrrr");
  
}

toggleEdit() {
  this.editMode = !this.editMode;

  if (this.editMode) {
    this.editOrDetailsForm.enable();
  } else {
    this.editOrDetailsForm.disable();
  }
}

updateData() {


  this.editMode = false;
  this.editOrDetailsForm.disable();
}
}
  
