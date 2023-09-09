export class RegisterDto {
  firstName:string ='';
  secondName:string = '';
  lastttName?: string ='';
  password: string ='';
  phoneNumber: string ='';
  parentPhoneNumber: string='';
  yearid:number = 0;
  role: number = 0;
  userClassDTO : userClassDTOs ={} ;
}

export class userClassDTOs 
    {
      id?: number = 0;
      name?: string ='';
    }




