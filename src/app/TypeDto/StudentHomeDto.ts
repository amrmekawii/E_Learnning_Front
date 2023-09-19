export class Selectdto {
    id?: number;
    name: string = '';
  }
  
  export class StudentHomeDto {
    name:string=''
    userClasses: Selectdto[] = [];
    userrequists: Selectdto[] = [];
    classesCanEnroll: Selectdto[] = [];
  }