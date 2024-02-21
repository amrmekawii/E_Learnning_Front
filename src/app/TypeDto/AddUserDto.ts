  import { Role } from "src/app/TypeDto/Role";
 import { UserClassDTO } from "src/app/TypeDto/UserClassDTO";
    
    export class AddUserDto {
        firstName?: string |null ="";
        secondName?: string |null ="";
        updatedBy?: string |null ="";
        updatedat?: string |null ="";
        lastName?: string | null ="";
        phoneNumber?: string | null ="" ;
        parentPhoneNumber?: string | null ="" ;
        active?: boolean = false;
        yearid?: number | null =null;
        role?: Role = 1 ;
        userClassDTOs?: UserClassDTO[] | null  = null  ;
        placeTimeId:number|null = null
    }


