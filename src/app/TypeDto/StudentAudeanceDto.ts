
  export interface  userLectureAttendancesDto {

    lectureName:String
    userLectureAttendances:userAttendancesDto
  }


  export interface  userAttendancesDto {
    userName:string
    start: any
    end:any
  }