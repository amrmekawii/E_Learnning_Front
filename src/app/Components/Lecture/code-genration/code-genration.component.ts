import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { CodeLecDto, GenrateCodeDto } from 'src/app/TypeDto/CodeGenrateDto';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';

@Component({
  selector: 'app-code-genration',
  templateUrl: './code-genration.component.html',
  styleUrls: ['./code-genration.component.css']
})
export class CodeGenrationComponent implements OnInit {

  quizForm!: FormGroup;
  lecturers: any[] = [];
  ClassList: ClassAllDto[]=[]
  LectureList:GetLectByClassIdDto[]=[]
  ObjectToGenerateCodes= new GenrateCodeDto()
  CodeList:CodeLecDto[]=[]
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
      lectureId: ['', Validators.required],
      quizRequirement: ['', Validators.required],
      duration: ['', Validators.required],
      numcode: ['', Validators.required]
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
    if (this.quizForm.valid) {
     
      this.ObjectToGenerateCodes.lectureid =form.value.lectureId;
      this.ObjectToGenerateCodes.numberofCode =form.value.numcode;
      this.ObjectToGenerateCodes.quizRequired =form.value.quizRequirement;
      this.ObjectToGenerateCodes.duration =form.value.duration;

      this.GetLectureBclassId.GenerateCodeLecture(this.ObjectToGenerateCodes).subscribe({
        next:(data)=>{
          this.CodeList = data
          this.toastr.success("Generation Done")

            },
            error:(error)=>{
          
            }
      })
      this.quizForm.reset();
    }
  }


  handleExport() {
    if( this.CodeList.length !==0){
    const invoiceContentElement=document.getElementById('Print_invice') as HTMLElement;
    html2canvas(invoiceContentElement,{}).then(canvas=>{
      // is convert the canvas into base64 string url
      const imgData=canvas.toDataURL('image/png');
      // page width
      const pageWidth=210;
      const pageHeight=297;
      // calcuate the image actual height to fit with canvas and pdf
      const height=canvas.height*pageWidth/canvas.width;
      // initialize the PDF
      const pdf=new jsPDF("p","mm","a4");
      // add the image into pdf
      pdf.addImage(imgData,'PNG',0,0,pageWidth,height);

      pdf.save('invoice.pdf');
      
    })
  }
  else{
    this.toastr.warning("Nmuber of Generation code Zero","Genrate Codes First")

  }
}
}
