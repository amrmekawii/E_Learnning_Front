
export class LectuterAddDto {
    classid?:number ;
    header?:String ;
    quizid?: number;
    assighnmentid?: number;
    number?: number;
    addvideos : addvideosDTOs[]=[]  ;
  }
  
  export class addvideosDTOs 
      {
        link?: string ;
        partHeader?: string ;
        PartNumber?: number;
      }
  
  
      export   class UpdateLucturDto {
        lectureId?: number;
        classid?: number;
        header?: string;
        quizid?: number;
        assighnmentid?: number;
      }
  
  




