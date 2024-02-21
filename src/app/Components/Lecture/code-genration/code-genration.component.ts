import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { CodeLecDto, GenrateCodeDto } from 'src/app/TypeDto/CodeGenrateDto';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-code-genration',
  templateUrl: './code-genration.component.html',
  styleUrls: ['./code-genration.component.css']
})
export class CodeGenrationComponent implements OnInit {
codetype: any =0 ;
  quizForm!: FormGroup;
  lecturers: any[] = [];
  ClassList: ClassAllDto[]=[]
  LectureList:GetLectByClassIdDto[]=[]
  ObjectToGenerateCodes= new GenrateCodeDto()
  CodeList:any[]=[]

  reuslt:any = false ;
  reusltlist:any[]=[] 

  constructor(private formBuilder: FormBuilder,private Getcalsss: GetAllLectureService,private GetLectureBclassId :GetAllLectureService,private toastr: ToastrService) { }

  ngOnInit() {


      this.Getcalsss.GetAllClass().subscribe({
        next: (data) => {
          this.ClassList = data
          console.log(   this.ClassList)
    
        },
        error: (err) => {
          console.log(err)
        }
      })
    
    
    this.quizForm = this.formBuilder.group({
      lectureId: ['' ],
      quizRequirement: ['', Validators.required],
      duration: ['', Validators.required],
      numcode: ['', Validators.required] ,
      classid:[''], 
      codetype:['' ]
    });
  }


  PathcalssId(calssid:any){

    
this.GetLectureBclassId.GetLecByClassId(calssid).subscribe({
  next:(data)=>{
this.LectureList = data
  },
  error:(error)=>{

  }
})

   } 
  submitForm(form:FormGroup) {
    this.reuslt=false
    if (this.quizForm.valid) { 
     
      form.get("codetype")?.setValue(this.codetype);
  console.log(form.value)
if (form.value.codetype==0){
  this.ObjectToGenerateCodes.lectureid =null
   this.ObjectToGenerateCodes.classid=null
}
else if (form.value.codetype==1){
   this.ObjectToGenerateCodes.lectureid =null

   this.ObjectToGenerateCodes.classid=form.value.classid
}


else if (form.value.codetype==2){
   this.ObjectToGenerateCodes.lectureid =form.value.lectureId

  this.ObjectToGenerateCodes.classid=form.value.classid
}
this.ObjectToGenerateCodes.numberofCode =form.value.numcode;

   this.ObjectToGenerateCodes.CodeTybe=form.value.codetype;
       this.ObjectToGenerateCodes.QuizRequird =form.value.quizRequirement;

    this.ObjectToGenerateCodes.duration =form.value.duration;

      this.GetLectureBclassId.GenerateCodeLecture(this.ObjectToGenerateCodes).subscribe({
        next:(data)=>{
          this.CodeList = data

          this.toastr.success("Generation Done")

          setTimeout(() => {
          
           
         this.handleExport(this.ObjectToGenerateCodes.CodeTybe);
          


        }  , 1000);
          this.quizForm.reset()
        },
            error:(error)=>{
              this.toastr.error("something went wrong ")

            }
      })
    }else{
      this.toastr.error("complete data ")

    }
  }


  handleExport(c:any) {
    if( this.CodeList.length !==0){

   
      // is convert the canvas into base64 string url
      const doc = new jsPDF()
      
      autoTable(doc, { html: '#Print_invice' })

      //pdf.autoTable({ html: '#Print_invice' })

      // add the image into pdf
let d = new Date().toDateString()
 if (c==0) {
  doc.save("super master code " + d);

 }
 else if (c==1) {
  doc.save("Master code " + d);
 
 } else if (c==2) {
  doc.save("Lecture  code " + d);

 }
      
  
  }
  else{
    this.toastr.warning("Nmuber of Generation code Zero","Genrate Codes First")

  }
}
changecodetype(valu:any){
this.codetype=valu
this.quizForm.reset()

}


Getprinted(){

  this.reuslt=true
  this.GetLectureBclassId.Getcode().subscribe({

    next:(data :any) =>{
this.reusltlist = data;
      console.log(data);
    }
  })
}

}
 enum CodeType {

  super, master,lecture 
}
