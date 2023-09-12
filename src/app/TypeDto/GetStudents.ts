export interface UserInClassDto {
    id: string;
    username: string;
    name: string;
    phoneNumber: string | null;
    parentPhoneNumber: string;
    active: boolean;
    password: string;
    userYear: UserYear;
  }
  
  export interface UserYear {
    id: number;
    name: string | null;
    classes: Class[];
  }
  
  export interface Class {
    id: number;
    name: string;
  }