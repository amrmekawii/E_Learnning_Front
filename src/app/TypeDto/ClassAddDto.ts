
export class ClassAddDto {
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
  
  
  
  




