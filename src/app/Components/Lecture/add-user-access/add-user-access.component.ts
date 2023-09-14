import { Component, OnInit } from '@angular/core';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { SharedService } from 'src/app/Services/Shared/shared.service';
import { ClassActive } from 'src/app/TypeDto/ClassIdActive';
import { EditOrDetailsDto } from 'src/app/TypeDto/EditOrDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddUserAccessDto } from 'src/app/TypeDto/AddUserAccessDto';
import { ToastrService } from 'ngx-toastr';



export class UserDto {
  UserId?: string;
  UserName?: string;
  Phone?: string | null;
  Duration?: number;
  QuizRequird?: boolean;
  position: number = 0;

}

@Component({
  selector: 'app-add-user-access',
  templateUrl: './add-user-access.component.html',
  styleUrls: ['./add-user-access.component.css'],


})


export class AddUserAccessComponent implements OnInit {

  EditOrDetails = new EditOrDetailsDto()
  ClassLecNam : any
  ClassIdAcriveStudent = new ClassActive()
  UserData: UserDto[] = []
  durationForAll: number = 1; 
  objectUserForAccessService: AddUserAccessDto[]=[]
  constructor(private ShareService: SharedService, private GetAllActive: GetAllLectureService,    private toastr: ToastrService
    ) { }
  ngOnInit(): void {


    this.EditOrDetails = this.ShareService.getObject()
    this.ClassLecNam = this.ShareService.getObject2()
    this.ClassIdAcriveStudent.classid = this.EditOrDetails.classId
    this.ClassIdAcriveStudent.active = true
    this.GetAllActive.UserActive(this.ClassIdAcriveStudent).subscribe({
      next: (data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.UserData[i] = new UserDto()
          this.UserData[i].UserId = data[i].id
          this.UserData[i].UserName = data[i].name
          this.UserData[i].Phone = data[i].phoneNumber
          this.UserData[i].QuizRequird = false
          this.UserData[i].Duration = 0
          this.UserData[i].position = i + 1


        }

        console.log(this.UserData)
        this.dataSource = new MatTableDataSource<UserDto>(this.UserData);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  displayedColumns: string[] = ['select', 'position', 'UserId', 'UserName', 'Phone', 'QuizRequird', 'Duration'];
  dataSource = new MatTableDataSource<UserDto>(this.UserData);
  selection = new SelectionModel<UserDto>(true, []);


  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  checkboxLabel(row?: UserDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  // for submit change access
  saveSelectedRows(): void {
    const selectedRows = this.selection.selected;
    for (let i = 0; i < selectedRows.length; i++) {
      this.objectUserForAccessService[i] =new AddUserAccessDto()
      this.objectUserForAccessService[i].lectureId = this.EditOrDetails.lectureId
      this.objectUserForAccessService[i].userId = selectedRows[i].UserId 
      this.objectUserForAccessService[i].accessType =1
      this.objectUserForAccessService[i].duration =selectedRows[i].Duration
      this.objectUserForAccessService[i].quizRequired =selectedRows[i].QuizRequird 
    }
    this.GetAllActive.UserAddAccess(this.objectUserForAccessService).subscribe({
      next:(data)=>{
        this.toastr.success("Done", "success Added Access ")
      },
      error:(error)=>{
        this.toastr.warning(error)
      }
    })
  }
// الزرار ال ف الجدول الكويز والوقت total
  toggleAllQuizRequird(value: boolean): void {
    this.UserData.forEach((user) => {
      user.QuizRequird = value;
    });
  }
  setDurationForAll(): void {
    if (this.durationForAll < 1) {
      return; 
    }

    this.UserData.forEach((user) => {
      user.Duration = this.durationForAll;
    });
  }
}