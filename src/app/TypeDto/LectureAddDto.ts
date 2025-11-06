
export class LectuterAddDto {
    classid?:number ;
    header?:String ;
    quizid?: number;
    assighnmentid?: number;
    number?: number;
    addvideos : addvideosDTOs[]=[]  ;
    addFiles? : addFilesDTOs[]=[]  ;
  }
  
  export class addvideosDTOs 
      {
        link?: string ;
        partHeader?: string ;
        number?: number;
      }
  
  export class addFilesDTOs 
      {
        path?: string ;
        partHeader?: string ;
        number?: number;
      }
  
  
      export   class UpdateLucturDto {
        lectureId?: number;
        classid?: number;
        header?: string;
        quizid?: number;
        assighnmentid?: number;
        number?: number;
      }
  
  




